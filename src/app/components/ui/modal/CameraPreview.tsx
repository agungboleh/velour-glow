"use client";
import { useState, useRef, useEffect, type MutableRefObject } from "react";
import { BeautySource, useBeauty } from "../../hooks/useBeauty";
import { RawCamera } from "./RawCamera";

const SLIDER_MIN = 15;
const SLIDER_MAX = 85;

type SnapshotFn = () => Promise<string | null>;

interface CameraPreviewProps {
  source: BeautySource;
  lightMode: string;
  shadeColor: string;
  finish: string;
  snapshotRef: MutableRefObject<SnapshotFn | null>;
  onExpired: () => void;
  isSplitView: boolean;
}

export function CameraPreview({
  source,
  lightMode,
  shadeColor,
  finish,
  snapshotRef,
  onExpired,
  isSplitView,
}: CameraPreviewProps) {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const { ready, error, expired, cameraStream, setShade, takeScreenshot } =
    useBeauty(previewRef, source);

  useEffect(() => {
    if (!ready) return;
    setShade({ color: shadeColor, finish });
  }, [ready, shadeColor, finish, setShade]);

  useEffect(() => {
    snapshotRef.current = takeScreenshot;
    return () => {
      snapshotRef.current = null;
    };
  }, [takeScreenshot, snapshotRef]);

  useEffect(() => {
    if (expired) onExpired();
  }, [expired, onExpired]);

  useEffect(() => {
    if (isSplitView) setSliderPosition(50);
  }, [isSplitView]);

  const updateSliderFromPointer = (clientX: number) => {
    const rect = previewRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(SLIDER_MAX, Math.max(SLIDER_MIN, pct)));
  };

  const onPointerDownSlider = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    updateSliderFromPointer(e.clientX);
  };

  const onPointerMoveSlider = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    updateSliderFromPointer(e.clientX);
  };

  const onPointerUpSlider = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const filters: string[] = [];
  if (lightMode === "golden")
    filters.push("sepia(0.2) saturate(1.2) contrast(1.05)");
  if (lightMode === "studio")
    filters.push("brightness(1.08) contrast(1.1) saturate(1.05)");

  const showSplit = isSplitView && ready && !!cameraStream;

  return (
    <div
      ref={previewRef}
      className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center select-none"
      style={{ filter: filters.length ? filters.join(" ") : "none" }}
    >
      {source.type === "camera" && !ready && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-base/60 text-white text-sm font-medium z-20">
          Mengaktifkan Kamera...
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-base/90 text-primary text-xs p-6 text-center z-20">
          {error}
        </div>
      )}
      {source.type === "image" && !ready && (
        <img
          src={source.src}
          alt="Virtual Try-On Model"
          className="absolute inset-0 w-full h-full object-cover object-top z-0"
        />
      )}

      {showSplit && (
        <>
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <RawCamera stream={cameraStream!} />
          </div>

          <div
            className="absolute top-0 bottom-0 z-30 w-10 -translate-x-1/2 cursor-ew-resize touch-none flex items-center justify-center"
            style={{ left: `${sliderPosition}%` }}
            onPointerDown={onPointerDownSlider}
            onPointerMove={onPointerMoveSlider}
            onPointerUp={onPointerUpSlider}
            onPointerCancel={onPointerUpSlider}
            role="slider"
            aria-label="Geser untuk membandingkan sebelum dan sesudah"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPosition)}
          >
            <div className="absolute top-0 bottom-0 w-0.5 bg-black" />
            <div className="absolute w-1.5 h-10 bg-black rounded-full left-1.25" />
            <div className="absolute w-1.5 h-10 bg-black rounded-full right-1.25" />
          </div>
        </>
      )}
    </div>
  );
}
