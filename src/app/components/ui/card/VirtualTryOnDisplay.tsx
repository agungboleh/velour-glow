"use client";
import { RefObject } from "react";
import {
  RiSplitCellsHorizontal,
  RiEqualizerLine,
  RiCloseCircleLine,
} from "react-icons/ri";
import LipMaskOverlay from "../effect/LipMaskOverlay";

interface VirtualTryOnDisplayProps {
  containerRef: RefObject<HTMLDivElement | null>;
  modelSrc: string;
  lightingFilter: string;
  isSplitView: boolean;
  sliderPosition: number;
  currentShade: { id: string; name: string; color: string };
  selectedFinish: string;
  onToggleSplitView: () => void;
  onPointerDownSlider: (e: React.PointerEvent) => void;
}

export default function VirtualTryOnDisplay({
  containerRef,
  modelSrc,
  lightingFilter,
  isSplitView,
  sliderPosition,
  currentShade,
  selectedFinish,
  onToggleSplitView,
  onPointerDownSlider,
}: VirtualTryOnDisplayProps) {
  return (
    <div
      ref={containerRef}
      className="relative w-full h-110 md:h-135 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-gray-100 select-none"
      style={{ filter: lightingFilter }}
    >
      <img
        alt="Sebelum menggunakan makeup"
        className="absolute inset-0 w-full h-full object-cover"
        src={modelSrc}
        draggable={false}
      />
      <div
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
        style={{
          clipPath: isSplitView ? `inset(0 0 0 ${sliderPosition}%)` : "none",
        }}
      >
        <LipMaskOverlay
          color={currentShade.color}
          finish={selectedFinish}
          isSplitView={false}
          sliderPosition={0}
        />
      </div>
      {isSplitView && (
        <div
          className="absolute top-0 bottom-0 z-30 w-10 -translate-x-1/2 cursor-ew-resize touch-none flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
          onPointerDown={onPointerDownSlider}
        >
          <div className="absolute top-0 bottom-0 w-0.5 bg-black" />
          <div className="absolute mt-40 w-1.5 h-10 bg-black rounded-full left-1.25"></div>
          <div className="absolute mt-40 w-1.5 h-10 bg-black rounded-full right-1.25"></div>
        </div>
      )}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 z-30 pointer-events-none">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-base/70 shadow-md pointer-events-auto">
          <RiEqualizerLine className="text-primary text-lg" />
          <span className="text-xs font-bold">
            Sedang Dicoba: {currentShade.id} {currentShade.name} (
            {selectedFinish})
          </span>
        </div>
        <button
          onClick={onToggleSplitView}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold shadow-md text-white transition-colors pointer-events-auto cursor-pointer ${
            isSplitView
              ? "bg-base/70 hover:bg-base"
              : "bg-primary hover:bg-primary-700"
          }`}
          type="button"
        >
          {isSplitView ? (
            <RiCloseCircleLine className="text-lg" />
          ) : (
            <RiSplitCellsHorizontal className="text-lg" />
          )}
          {isSplitView ? "Tutup Split View" : "Split View (Sebelum/Sesudah)"}
        </button>
      </div>
    </div>
  );
}
