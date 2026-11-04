"use client";
import { useState, useRef, useEffect } from "react";
import { RiCameraLensFill, RiVideoOnLine } from "react-icons/ri";
import ShadeToneCard from "../ui/card/ShadeToneCard";
import SimulasiCahayaCard from "../ui/card/SimulasiCahayaCard";
import FinishingSelector from "../ui/card/FinishingSelector";
import TryOnSummaryCard from "../ui/card/TryOnSummaryCard";
import VirtualTryOnDisplay from "../ui/card/VirtualTryOnDisplay";
import { ButtonIconLeft } from "../ui/button/buttons";
import dynamic from "next/dynamic";

const VirtualTryOnModal = dynamic(
  () => import("../ui/modal/VirtualTryOnModal"),
  { ssr: false },
);

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const [selectedFinish, setSelectedFinish] = useState("Jelly Gloss");
  const [selectedShadeId, setSelectedShadeId] = useState("#02");
  const [selectedShadeName, setSelectedShadeName] = useState("Berry Splash");
  const [lightMode, setLightMode] = useState("alami");
  const [isSplitView, setIsSplitView] = useState(false);
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
  const handleToggleSplitView = () => {
    setIsSplitView(!isSplitView);
    setSliderPosition(50);
  };
  const handlePointerDownSlider = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
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
              <VirtualTryOnDisplay
                containerRef={containerRef}
                modelSrc={MODEL_SRC}
                lightingFilter={getLightingFilter()}
                isSplitView={isSplitView}
                sliderPosition={sliderPosition}
                currentShade={currentShade}
                selectedFinish={selectedFinish}
                onToggleSplitView={handleToggleSplitView}
                onPointerDownSlider={handlePointerDownSlider}
              />
              <div className="mt-4">
                <SimulasiCahayaCard
                  lightMode={lightMode}
                  setLightMode={setLightMode}
                />
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <FinishingSelector
                  selectedFinish={selectedFinish}
                  setSelectedFinish={setSelectedFinish}
                />
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
                <TryOnSummaryCard
                  currentShade={currentShade}
                  selectedFinish={selectedFinish}
                />
                <ButtonIconLeft
                  onClick={() => {
                    closeMenu();
                    setIsTryOnOpen(true);
                  }}
                  label="Coba di Wajahmu (Virtual Try-On) ✨"
                  icon={RiVideoOnLine}
                  className="cursor-pointer inline-flex items-center justify-center rounded-full bg-primary-700 px-8 py-4 text-sm font-bold text-white shadow-[0_10px_24px_-4px_rgba(255,45,120,0.3)] transition-transform active:scale-95 hover:bg-primary-400"
                  size="text-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <VirtualTryOnModal
        isOpen={isTryOnOpen}
        onClose={() => setIsTryOnOpen(false)}
      />
    </section>
  );
}
