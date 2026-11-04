"use client";
import { useEffect, useRef } from "react";

interface RawCameraProps {
  stream: MediaStream;
}

export function RawCamera({ stream }: RawCameraProps) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.srcObject = stream;
    el.play().catch(() => {});
  }, [stream]);

  return (
    <video
      ref={ref}
      autoPlay
      playsInline
      muted
      className="absolute inset-0 h-full w-full object-cover -scale-x-100"
    />
  );
}
