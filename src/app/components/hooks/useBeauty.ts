"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// Sumber gambar untuk DeepAR:
// - image  : foto statis (dipakai di VirtualTryOnSection)
// - camera : kamera pengguna (dipakai di popup Coba Try On)
export type BeautySource = { type: "image"; src: string } | { type: "camera" };

// Ubah warna hex menjadi gambar polos kecil untuk dipakai sebagai tekstur shade
const colorToImage = (hex: string) => {
  const c = document.createElement("canvas");
  c.width = c.height = 4;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = hex;
  ctx.fillRect(0, 0, 4, 4);
  return c.toDataURL("image/png");
};

const MAX_SIDE = 1280; // batasi ukuran foto agar pemrosesan tetap ringan

export function useBeauty(
  previewRef: React.RefObject<HTMLDivElement | null>,
  source: BeautySource
) {
  const beautyRef = useRef<any>(null);
  const deeparRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dependency memakai nilai primitif, bukan objek `source`,
  // supaya DeepAR tidak diinisialisasi ulang di setiap render.
  const sourceType = source.type;
  const imageSrc = source.type === "image" ? source.src : "";

  useEffect(() => {
    let cancelled = false;
    let rafId = 0;
    let stream: MediaStream | null = null;
    let video: HTMLVideoElement | null = null;
    const isImage = sourceType === "image";

    // Sembunyikan pesan "INFO:" dari DeepAR agar overlay Next.js tidak muncul
    const originalError = console.error;
    console.error = (...args: any[]) => {
      if (typeof args[0] === "string" && args[0].startsWith("INFO:")) return;
      originalError(...args);
    };

    (async () => {
      try {
        const deepar = await import("deepar");
        const Beauty = await import("@deepar/beauty");
        if (cancelled) return;

        // MODE IMAGE: foto -> canvas -> captureStream -> <video>.
        // Dengan begitu DeepAR menerimanya persis seperti kamera.
        // Di dalam useBeauty.ts (Mode Image yang dioptimalkan)
if (isImage) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Gagal memuat " + imageSrc));
    img.src = imageSrc;
  });
  if (cancelled) return;

  const scale = Math.min(
    1,
    MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight)
  );
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  const ctx = canvas.getContext("2d")!;

  // Cukup gambar sekali di awal, karena gambar statis tidak butuh loop draw() terus-menerus!
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  stream = canvas.captureStream(10); // Turunkan FPS stream statis cukup ke 10 FPS untuk hemat CPU
  video = document.createElement("video");
  video.muted = true;
  video.playsInline = true;
  video.srcObject = stream;
  await video.play();
  if (cancelled) return;
}

        const deepAR = await deepar.initialize({
          licenseKey: process.env.NEXT_PUBLIC_DEEPAR_LICENSE_KEY!,
          previewElement: previewRef.current!,
          // Mode image: matikan kamera bawaan.
          // Mode camera: biarkan DeepAR membuka kameranya sendiri.
          ...(isImage && {
            additionalOptions: { cameraConfig: { disableDefaultCamera: true } },
          }),
        } as any);

        if (cancelled) {
          deepAR.shutdown();
          return;
        }

        // false = jangan mirror (foto bukan selfie)
        if (isImage && video) await deepAR.setVideoElement(video, false);

        const beauty = await Beauty.initializeBeauty(
          deepAR,
          "https://cdn.jsdelivr.net/npm/@deepar/beauty/dist/"
        );

        if (cancelled) {
          deepAR.shutdown();
          return;
        }

        beauty.lipMakeup.lipstick.enable.set(true);
        beauty.lipMakeup.lipstick.amount.set(70);

        deeparRef.current = deepAR;
        beautyRef.current = beauty;
        setReady(true);
      } catch (e: any) {
        if (cancelled || e?.name === "AbortError") return;
        setError(e?.message ?? "Gagal memulai DeepAR");
      }
    })();

    return () => {
      console.error = originalError;
      cancelled = true;
      cancelAnimationFrame(rafId);
      // shutdown() juga menghentikan kamera pada mode camera
      deeparRef.current?.shutdown();
      deeparRef.current = null;
      beautyRef.current = null;
      stream?.getTracks().forEach((t) => t.stop());
      if (video) video.srcObject = null;
      setReady(false);
    };
  }, [previewRef, sourceType, imageSrc]);

  const setShade = useCallback(
    async (shade: { template?: string; color?: string }, amount = 70) => {
      const b = beautyRef.current;
      if (!b) return;
      try {
        b.lipMakeup.lipstick.enable.set(true);
        if (shade.color) {
          await b.lipMakeup.lipstick.shade.set(colorToImage(shade.color));
        } else if (shade.template) {
          await b.lipMakeup.lipstick.shade.setTemplate(shade.template);
        }
        b.lipMakeup.lipstick.amount.set(amount);
      } catch (e) {
        console.error("Gagal set shade:", shade, e);
      }
    },
    []
  );

  const listTemplates = () =>
    beautyRef.current?.lipMakeup.lipstick.shade.getTemplates();

  const takeScreenshot = async (): Promise<string | null> => {
    try {
      return (await deeparRef.current?.takeScreenshot()) ?? null;
    } catch {
      return null;
    }
  };

  return { ready, error, setShade, listTemplates, takeScreenshot };
}