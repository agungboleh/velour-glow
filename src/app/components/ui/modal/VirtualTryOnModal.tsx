"use client";
import { useState, useRef, useEffect } from "react";
import {
  RiCloseLargeLine,
  RiEqualizerLine,
  RiSplitCellsHorizontal,
  RiCamera4Line,
  RiSunLine,
  RiRainbowLine,
  RiPaletteLine,
} from "react-icons/ri";
import { BeautySource } from "../../hooks/useBeauty";
import { ShadeData, FINISHES } from "./tryOnData";
import { CameraPreview } from "./CameraPreview";
import { TryOnContentTabs } from "./TryOnContentTabs";

type SnapshotFn = () => Promise<string | null>;
interface VirtualTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VirtualTryOnModal({ isOpen, onClose }: VirtualTryOnModalProps) {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"lighting" | "finishing" | "shade" | null>(null);
  const [lightMode, setLightMode] = useState("alami");
  const [selectedFinish, setSelectedFinish] = useState<(typeof FINISHES)[number]>("Jelly Gloss");
  const [selectedShadeId, setSelectedShadeId] = useState("#02");
  const [isSplitView, setIsSplitView] = useState(false);
  const [snapshotText, setSnapshotText] = useState("Snapshot");
  const snapshotRef = useRef<SnapshotFn | null>(null);
  const [sessionEnded, setSessionEnded] = useState(false);

  const currentShade = ShadeData.find((s) => s.id === selectedShadeId) || ShadeData[1];

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsMounted(true), 50);
      return () => clearTimeout(timer);
    }
    setIsMounted(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    const needsRefresh = sessionEnded;
    setIsAgreed(false);
    setIsCameraActive(false);
    setActiveTab(null);
    setIsMounted(false);
    setSessionEnded(false);
    setIsSplitView(false);
    onClose();
    if (needsRefresh) window.location.reload();
  };

  const handleExpired = () => {
    setIsCameraActive(false);
    setActiveTab(null);
    setIsSplitView(false);
    setSessionEnded(true);
  };

  const handleSnapshotAction = async () => {
    const dataUrl = await snapshotRef.current?.();
    if (!dataUrl) {
      setSnapshotText("Gagal");
      setTimeout(() => setSnapshotText("Snapshot"), 1500);
      return;
    }
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `velour-glow-${Date.now()}.png`;
    a.click();
    setSnapshotText("Tersimpan!");
    setTimeout(() => setSnapshotText("Snapshot"), 1500);
  };

  const beautySource: BeautySource = { type: "camera" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-base/70 p-2 sm:p-4 backdrop-blur-sm">
      <div className="relative flex flex-col w-full max-w-md h-[96vh] bg-base rounded-3xl overflow-hidden shadow-2xl">
        <button
          onClick={handleClose}
          disabled={sessionEnded}
          className="absolute top-4 right-4 z-40 flex h-9 w-9 items-center justify-center rounded-full bg-base/50 text-white backdrop-blur-md transition hover:bg-base cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Tutup modal"
        >
          <RiCloseLargeLine className="h-5 w-5" />
        </button>

        <div className="relative w-full flex-1 min-h-0 bg-base overflow-hidden flex items-center justify-center">
          {!isCameraActive && (
            <img
              src="/assets/model-effect.webp"
              alt="Virtual Try-On Model"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          )}
          {isMounted && isCameraActive && (
            <CameraPreview
              key={beautySource.type}
              source={beautySource}
              lightMode={lightMode}
              shadeColor={currentShade.color}
              finish={selectedFinish}
              snapshotRef={snapshotRef}
              onExpired={handleExpired}
              isSplitView={isSplitView}
            />
          )}
          <div className="absolute top-4 left-4 text-base font-black tracking-widest text-sm drop-shadow-md z-20 pointer-events-none">
            VELOUR <span className="text-primary">GLOW</span>
          </div>
        </div>

        {!isCameraActive && (
          <div className="relative z-30 -mt-6 shrink-0 flex flex-col p-5 sm:p-6 bg-white rounded-t-3xl shadow-2xl">
            <h3 className="text-xl font-extrabold tracking-tight text-base mb-2">VIRTUAL TRY-ON</h3>
            <p className="text-xs sm:text-sm text-base/70 mb-4 leading-relaxed">
              Untuk pengalaman Virtual Try-On yang terbaik, gunakan browser Safari di iOS dan Chrome di Android.
            </p>
            {sessionEnded && (
              <div className="mb-4 rounded-xl border border-primary bg-primary-50 px-4 py-3 text-xs font-semibold text-base/70">
                Sesi telah berakhir. Klik tombol TUTUP, lalu buka kembali Virtual Try-On untuk memulai sesi baru.
              </div>
            )}
            {!sessionEnded && (
              <div className="mb-5 rounded-2xl bg-base/5 p-4 border border-gray-100">
                <span className="text-xs font-bold text-base block mb-1">Kebijakan Privasi Kami</span>
                <p className="text-xs text-base/70 mb-3">Untuk mengakses servis ini, Anda setidaknya berumur 16 tahun.</p>
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="mt-0.5 h-5 w-5 shrink-0 rounded border-gray-300 accent-primary focus:ring-primary cursor-pointer"
                  />
                  <span className="text-xs text-base/70 leading-tight">
                    Saya setuju. Dengan menggunakan Try-On, saya memahami dan menyetujui kebijakan privasi serta syarat dan ketentuan yang berlaku.
                  </span>
                </label>
              </div>
            )}
            {sessionEnded ? (
              <button
                onClick={handleClose}
                className="w-full py-3.5 px-4 font-bold text-sm rounded-xl tracking-wider transition bg-primary-700 text-white hover:bg-primary-400 active:scale-95 cursor-pointer"
              >
                TUTUP
              </button>
            ) : (
              <button
                disabled={!isAgreed}
                onClick={() => {
                  setSessionEnded(false);
                  setIsCameraActive(true);
                }}
                className={`w-full py-3.5 px-4 font-bold text-sm rounded-xl tracking-wider transition ${
                  isAgreed
                    ? "bg-primary-700 text-white hover:bg-primary-400 active:scale-95 cursor-pointer"
                    : "bg-base/20 text-base/40 cursor-not-allowed"
                }`}
              >
                MULAI SELFIE
              </button>
            )}
          </div>
        )}

        {isCameraActive && (
          <div className="absolute inset-x-0 bottom-0 z-30 bg-base/90 backdrop-blur-xl border-t border-white/10 text-white flex flex-col">
            <div className="px-4 pt-3 pb-1 flex items-center justify-start pointer-events-none">
              <div className="inline-flex items-center gap-2 rounded-full bg-white backdrop-blur-md px-3.5 py-1.5 text-white shadow-md border border-white/10">
                <RiEqualizerLine className="text-primary-400 text-sm" />
                <span className="text-xs font-semibold text-base">
                  {currentShade.id} {currentShade.name} ({selectedFinish})
                </span>
              </div>
            </div>

            {/* Panel Tab Konten */}
            <TryOnContentTabs
              activeTab={activeTab}
              lightMode={lightMode}
              setLightMode={setLightMode}
              selectedFinish={selectedFinish}
              setSelectedFinish={setSelectedFinish}
              selectedShadeId={selectedShadeId}
              setSelectedShadeId={setSelectedShadeId}
            />

            {/* Bottom Navigation Menu */}
            <div className="grid grid-cols-5 py-3 px-2 items-center justify-items-center text-center">
              <button
                onClick={() => setActiveTab(activeTab === "lighting" ? null : "lighting")}
                className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition cursor-pointer ${
                  activeTab === "lighting" ? "text-primary-400" : "text-gray-300 hover:text-white"
                }`}
              >
                <RiSunLine className="text-xl" />
                <span>Lighting</span>
              </button>
              <button
                onClick={() => setActiveTab(activeTab === "finishing" ? null : "finishing")}
                className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition cursor-pointer ${
                  activeTab === "finishing" ? "text-primary-400" : "text-gray-300 hover:text-white"
                }`}
              >
                <RiRainbowLine className="text-xl" />
                <span>Finishing</span>
              </button>
              <button
                onClick={() => setActiveTab(activeTab === "shade" ? null : "shade")}
                className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition cursor-pointer ${
                  activeTab === "shade" ? "text-primary-400" : "text-gray-300 hover:text-white"
                }`}
              >
                <RiPaletteLine className="text-xl" />
                <span>Shade</span>
              </button>
              <button
                onClick={() => setIsSplitView(!isSplitView)}
                className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition cursor-pointer ${
                  isSplitView ? "text-primary-400" : "text-gray-300 hover:text-white"
                }`}
              >
                <RiSplitCellsHorizontal className="text-xl" />
                <span>Split View</span>
              </button>
              <button
                onClick={handleSnapshotAction}
                className="flex flex-col items-center gap-1 text-[10px] font-semibold text-gray-300 hover:text-white transition cursor-pointer"
              >
                <RiCamera4Line className="text-xl text-white" />
                <span>{snapshotText}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}