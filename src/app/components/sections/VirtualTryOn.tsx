"use client";
import { useState, useRef, useEffect } from "react";
import {
  RiShareLine,
  RiSplitCellsHorizontal,
  RiCameraLensFill,
  RiEqualizerLine,
  RiCamera4Line,
  RiRainbowLine,
  RiCloudLine,
  RiInfoI,
  RiCloseCircleLine,
} from "react-icons/ri";
import ShadeToneCard from "../ui/card/ShadeToneCard";
import LipMaskOverlay from "../ui/effect/LipMaskOverlay";

const MODEL_SRC = "/assets/model.webp";
const ShadeData = [
  {
    id: "#01",
    name: "Dewy Coral",
    tone: "Warm",
    desc: "Warm Peach",
    color: "#F27A7D",
  },
  {
    id: "#02",
    name: "Berry Splash",
    tone: "Neutral / Cool",
    desc: "Rich Berry",
    color: "#A51D4D",
  },
  {
    id: "#03",
    name: "Peach Glow",
    tone: "Warm",
    desc: "Soft Nude",
    color: "#FFA896",
  },
  {
    id: "#04",
    name: "Soft Rose",
    tone: "Neutral",
    desc: "Petal Pink",
    color: "#C76B7D",
  },
  {
    id: "#05",
    name: "Dusty Mauve",
    tone: "Cool",
    desc: "Classy Plum",
    color: "#935764",
  },
  {
    id: "#06",
    name: "Velvet Red",
    tone: "All Tones",
    desc: "Classic Crimson",
    color: "#801026",
  },
];

export default function VirtualTryOnSection() {
  const [selectedFinish, setSelectedFinish] = useState("Jelly Gloss");
  const [selectedShadeId, setSelectedShadeId] = useState("#02");
  const [selectedShadeName, setSelectedShadeName] = useState("Berry Splash");
  const [lightMode, setLightMode] = useState("alami");
  const [isSplitView, setIsSplitView] = useState(false);
  const [snapshotText, setSnapshotText] = useState("Snapshot");
  const [shareText, setShareText] = useState("Bagikan");
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentShade =
    ShadeData.find((s) => s.id === selectedShadeId) || ShadeData[1];
  useEffect(() => {
    if (!isDragging) return;
    const move = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      const boundedPct = Math.min(85, Math.max(15, pct));
      setSliderPosition(boundedPct);
    };
    const up = () => setIsDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [isDragging]);
  const getLightingFilter = () => {
    if (lightMode === "golden")
      return "sepia(0.2) saturate(1.2) contrast(1.05)";
    if (lightMode === "studio")
      return "brightness(1.08) contrast(1.1) saturate(1.05)";
    return "none";
  };
  const handleSnapshot = () => {
    setSnapshotText("Tersimpan!");
    setTimeout(() => setSnapshotText("Snapshot"), 1000);
  };
  const handleShare = () => {
    setShareText("Link Disalin!");
    setTimeout(() => setShareText("Bagikan"), 1000);
  };

  return (
    <section
      id="virtual-try-on"
      className="relative w-full bg-primary/5 scroll-mt-20 overflow-hidden"
    >
      <div className="relative mx-auto max-w-340 w-full px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="mx-auto mb-12 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-200 px-4 py-1.5 shadow-sm">
            <RiCameraLensFill className="text-primary-800 text-lg" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary-800">
              Instant Color Preview
            </span>
          </div>
          <div className="font-extrabold text-xl sm:text-3xl lg:text-4xl tracking-tight text-base mb-4">
            Studio Virtual Try-On
          </div>
          <p className="max-w-2xl text-base leading-relaxed">
            Temukan warna yang memancarkan pesona autentikmu secara instan dan
            ringan.
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_20px_40px_-10px_rgba(255,45,120,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 flex flex-col">
              <div
                ref={containerRef}
                className="relative w-full h-110 md:h-135 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-gray-100 select-none"
                style={{ filter: getLightingFilter() }}
              >
                <img
                  alt="Sebelum menggunakan makeup"
                  className="absolute inset-0 w-full h-full object-cover"
                  src={MODEL_SRC}
                  draggable={false}
                />
                <div
                  className="absolute inset-0 z-10 w-full h-full pointer-events-none"
                  style={{
                    clipPath: isSplitView
                      ? `inset(0 0 0 ${sliderPosition}%)`
                      : "none",
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
                    onPointerDown={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
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
                    onClick={() => {
                      setIsSplitView(!isSplitView);
                      setSliderPosition(50);
                    }}
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
                    {isSplitView
                      ? "Tutup Split View"
                      : "Split View (Sebelum/Sesudah)"}
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 mt-4 bg-primary-50 p-3 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-base font-bold uppercase mr-1">
                    Simulasi Cahaya :
                  </span>
                  {[
                    { id: "alami", label: "Alami" },
                    { id: "golden", label: "Golden Hour" },
                    { id: "studio", label: "Studio Ringlight" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setLightMode(item.id)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                        lightMode === item.id
                          ? "bg-primary text-white shadow-sm"
                          : "bg-white text-base/70 hover:bg-base/10 border border-gray-200"
                      }`}
                      type="button"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSnapshot}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs text-base font-bold hover:bg-gray-100 transition-colors shadow-sm border border-gray-200 cursor-pointer"
                    type="button"
                  >
                    <RiCamera4Line className="text-primary text-lg" />
                    {snapshotText}
                  </button>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs text-base font-bold hover:bg-gray-100 transition-colors shadow-sm border border-gray-200 cursor-pointer"
                    type="button"
                  >
                    <RiShareLine className="text-primary text-lg" />
                    {shareText}
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <div>
                  <label className="text-xs uppercase tracking-wider text-base font-bold block mb-3">
                    Pilih Karakter Finishing :
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-100">
                    <button
                      onClick={() => setSelectedFinish("Jelly Gloss")}
                      className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-bold transition-all cursor-pointer ${
                        selectedFinish === "Jelly Gloss"
                          ? "bg-primary text-white shadow-sm"
                          : "text-base/70 hover:bg-base/10"
                      }`}
                      type="button"
                    >
                      <RiRainbowLine className="text-lg" /> Jelly Gloss (Juicy)
                    </button>
                    <button
                      onClick={() => setSelectedFinish("Cloud Matte")}
                      className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-bold transition-all cursor-pointer ${
                        selectedFinish === "Cloud Matte"
                          ? "bg-primary text-white shadow-sm"
                          : "text-base/70 hover:bg-base/10"
                      }`}
                      type="button"
                    >
                      <RiCloudLine className="text-lg" /> Cloud Matte (Velvet)
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs uppercase tracking-wider text-base font-bold">
                      Pilihan Shade (6 Warna) :
                    </label>
                    <span className="text-xs text-primary-700 font-bold">
                      98% Cocok dengan Undertone
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {ShadeData.map((shade) => (
                      <ShadeToneCard
                        key={shade.id}
                        shade={shade}
                        isSelected={selectedShadeId === shade.id}
                        onSelect={() => {
                          setSelectedShadeId(shade.id);
                          setSelectedShadeName(shade.name);
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="bg-base/5 rounded-2xl p-4 flex items-start gap-3 border border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white shrink-0 mt-0.5">
                    <RiInfoI className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-base font-bold">
                      Ringkasan Pilihan Kamu :
                    </p>
                    <p className="text-xs text-base/70 mt-1 leading-relaxed">
                      Kamu sedang mencoba shade{" "}
                      <strong className="text-primary">
                        {currentShade.id} {currentShade.name}
                      </strong>{" "}
                      dengan finishing{" "}
                      <strong className="text-primary">{selectedFinish}</strong>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
