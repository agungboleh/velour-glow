"use client";

import { useCallback, useEffect, useRef, useState } from "react";
export type BeautySource = { type: "image"; src: string } | { type: "camera" };
export type ShadeOptions = {
  color?: string;
  template?: string;
  finish?: string;
  gloss?: string;
};
const MAX_SIDE = 1280;
const BEAUTY_CDN = "https://cdn.jsdelivr.net/npm/@deepar/beauty/dist/";
const SESSION_LIMIT_MS: number | null = 165_000;
const SHUTDOWN_DELAY_MS = 300;
let initQueue: Promise<void> = Promise.resolve();
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const colorToImage = (hex: string) => {
  const c = document.createElement("canvas");
  c.width = c.height = 4;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = hex;
  ctx.fillRect(0, 0, 4, 4);
  return c.toDataURL("image/png");
};
const isShutdownNoise = (msg: unknown) => {
  const s = String(msg ?? "");
  return s.includes("clearEffect") || s.includes("this.module");
};
let noiseGuardInstalled = false;
const installNoiseGuard = () => {
  if (noiseGuardInstalled || typeof window === "undefined") return;
  noiseGuardInstalled = true;
  window.addEventListener(
    "unhandledrejection",
    (ev: PromiseRejectionEvent) => {
      if (isShutdownNoise(ev.reason?.message ?? ev.reason)) {
        console.info("[useBeauty] error internal Beauty diredam (rejection)");
        ev.preventDefault();
        ev.stopImmediatePropagation();
      }
    },
    true,
  );
  window.addEventListener(
    "error",
    (ev: ErrorEvent) => {
      if (isShutdownNoise(ev.message ?? ev.error?.message)) {
        console.info("[useBeauty] error internal Beauty diredam (window)");
        ev.preventDefault();
        ev.stopImmediatePropagation();
      }
    },
    true,
  );
};
export function useBeauty(
  previewRef: React.RefObject<HTMLDivElement | null>,
  source: BeautySource,
) {
  const beautyRef = useRef<any>(null);
  const deeparRef = useRef<any>(null);
  const shadeTicket = useRef(0);
  const pendingRef = useRef<Promise<void>>(Promise.resolve());
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expired, setExpired] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const sourceType = source.type;
  const imageSrc = source.type === "image" ? source.src : "";
  useEffect(() => {
    let cancelled = false;
    let stream: MediaStream | null = null;
    let video: HTMLVideoElement | null = null;
    let redrawTimer: ReturnType<typeof setInterval> | null = null;
    let limitTimer: ReturnType<typeof setTimeout> | null = null;
    const isImage = sourceType === "image";
    const prev = initQueue;
    let release!: () => void;
    initQueue = new Promise<void>((resolve) => {
      release = resolve;
    });
    const startedAt = Date.now();
    const elapsed = () => Math.round((Date.now() - startedAt) / 1000);
    console.info(`[useBeauty] sesi "${sourceType}" dimulai`);
    let instance: any = null;
    let initializing = true;
    let closed = false;
    let hasExpired = false;
    const closeAndRelease = async () => {
      if (closed) return;
      closed = true;
      const inst = instance;
      instance = null;
      if (inst && !hasExpired) {
        await pendingRef.current.catch(() => {});
        await sleep(SHUTDOWN_DELAY_MS);
        console.info(
          `[useBeauty] shutdown() dipanggil oleh kode kita, detik ke-${elapsed()}`,
        );
        try {
          inst.shutdown();
        } catch {}
      }
      release();
    };
    setError(null);
    setExpired(false);
    setReady(false);
    setCameraStream(null);
    const originalError = console.error;
    console.error = (...args: any[]) => {
      if (typeof args[0] === "string" && args[0].startsWith("INFO:")) return;
      if (/free version|time expiration/i.test(String(args[0] ?? ""))) {
        console.info(
          `[useBeauty] Beauty melaporkan kedaluwarsa pada detik ke-${elapsed()}`,
        );
        hasExpired = true;
        beautyRef.current = null;
        setExpired(true);
        setReady(false);
        return;
      }
      originalError(...args);
    };
    installNoiseGuard();
    (async () => {
      try {
        await prev;
        if (cancelled) {
          await closeAndRelease();
          return;
        }
        const deepar = await import("deepar");
        const Beauty = await import("@deepar/beauty");
        if (cancelled) {
          await closeAndRelease();
          return;
        }
        if (isImage) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(new Error("Gagal memuat " + imageSrc));
            img.src = imageSrc;
          });
          if (cancelled) {
            await closeAndRelease();
            return;
          }
          const scale = Math.min(
            1,
            MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight),
          );
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(img.naturalWidth * scale);
          canvas.height = Math.round(img.naturalHeight * scale);
          const ctx = canvas.getContext("2d")!;
          const draw = () =>
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          draw();
          redrawTimer = setInterval(draw, 100);
          stream = canvas.captureStream(10);
          video = document.createElement("video");
          video.muted = true;
          video.playsInline = true;
          video.srcObject = stream;
          await video.play();
          if (cancelled) {
            await closeAndRelease();
            return;
          }
        } else {
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: "user",
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
            audio: false,
          });
          if (cancelled) {
            stream.getTracks().forEach((t) => t.stop());
            await closeAndRelease();
            return;
          }
          video = document.createElement("video");
          video.muted = true;
          video.playsInline = true;
          video.srcObject = stream;
          await video.play();
          if (cancelled) {
            stream.getTracks().forEach((t) => t.stop());
            await closeAndRelease();
            return;
          }
        }
        const initializeFn =
          deepar.initialize || (deepar as any).default?.initialize;
        instance = await initializeFn({
          licenseKey: process.env.NEXT_PUBLIC_DEEPAR_LICENSE_KEY!,
          previewElement: previewRef.current!,
          additionalOptions: { cameraConfig: { disableDefaultCamera: true } },
        });
        if (cancelled) {
          await closeAndRelease();
          return;
        }
        if (video) await instance.setVideoElement(video, !isImage);
        if (cancelled) {
          await closeAndRelease();
          return;
        }
        const beauty = await Beauty.initializeBeauty(instance, BEAUTY_CDN);
        const outerShutdown = instance.shutdown.bind(instance);
        let shutdownCalled = false;
        instance.shutdown = () => {
          if (shutdownCalled) {
            console.warn(
              "[useBeauty] shutdown() dipanggil lagi dan diabaikan. Pemanggil:",
              new Error().stack,
            );
            return;
          }
          shutdownCalled = true;
          try {
            const result = outerShutdown();
            if (result && typeof result.catch === "function") {
              result.catch(() => {});
            }
            return result;
          } catch (err: any) {
            if (!isShutdownNoise(err?.message)) throw err;
          }
        };
        deeparRef.current = instance;
        beautyRef.current = beauty;
        initializing = false;
        if (cancelled) {
          deeparRef.current = null;
          beautyRef.current = null;
          await closeAndRelease();
          return;
        }
        setCameraStream(isImage ? null : stream);
        setReady(true);
        if (SESSION_LIMIT_MS) {
          limitTimer = setTimeout(() => {
            if (cancelled || closed) return;
            shadeTicket.current++;
            beautyRef.current = null;
            deeparRef.current = null;
            setReady(false);
            setExpired(true);
            void closeAndRelease();
          }, SESSION_LIMIT_MS);
        }
      } catch (e: any) {
        initializing = false;
        await closeAndRelease();
        if (cancelled || e?.name === "AbortError") return;
        setError(e?.message ?? "Gagal memulai DeepAR");
      }
    })();
    return () => {
      cancelled = true;
      console.error = originalError;
      if (redrawTimer) clearInterval(redrawTimer);
      if (limitTimer) clearTimeout(limitTimer);
      shadeTicket.current++;
      beautyRef.current = null;
      deeparRef.current = null;
      if (!initializing) void closeAndRelease();
      stream?.getTracks().forEach((t) => t.stop());
      if (video) video.srcObject = null;
      setReady(false);
      setCameraStream(null);
    };
  }, [previewRef, sourceType, imageSrc]);
  const setShade = useCallback((shade: ShadeOptions, amount?: number) => {
    const run = async () => {
      const b = beautyRef.current;
      if (!b) return;
      const ticket = ++shadeTicket.current;
      const stale = () =>
        ticket !== shadeTicket.current || beautyRef.current !== b;
      const isGlossy = shade.finish === "Jelly Gloss";
      const lipstickAmount = amount ?? (isGlossy ? 70 : 85);
      try {
        const { lipstick, lipGloss } = b.lipMakeup;
        lipstick.enable.set(true);
        if (shade.color) {
          await lipstick.shade.set(colorToImage(shade.color));
        } else if (shade.template) {
          await lipstick.shade.setTemplate(shade.template);
        }
        if (stale()) return;
        lipstick.amount.set(lipstickAmount);
        if (isGlossy) {
          if (typeof lipGloss.gloss?.setTemplate === "function") {
            await lipGloss.gloss.setTemplate(shade.gloss ?? "basic");
          }
          if (stale()) return;
          lipGloss.amount.set(80);
          lipGloss.enable.set(true);
        } else {
          lipGloss.enable.set(false);
        }
      } catch (e) {
        if (beautyRef.current === b) {
          console.error("Gagal set shade & finish:", shade, e);
        }
      }
    };
    const p = run();
    pendingRef.current = p;
    return p;
  }, []);
  const listTemplates = useCallback(
    () => beautyRef.current?.lipMakeup.lipstick.shade.getTemplates(),
    [],
  );
  const takeScreenshot = useCallback(async (): Promise<string | null> => {
    try {
      return (await deeparRef.current?.takeScreenshot()) ?? null;
    } catch {
      return null;
    }
  }, []);
  return {
    ready,
    error,
    expired,
    cameraStream,
    setShade,
    listTemplates,
    takeScreenshot,
  };
}
