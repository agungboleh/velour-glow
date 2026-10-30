// "use client";
// import { useState } from "react";
// import {
//   RiShareLine,
//   RiFlaskLine,
//   RiEyeLine,
//   RiSplitCellsHorizontal,
//   RiLink,
//   RiCameraLensFill,
//   RiEqualizerLine,
//   RiCamera4Line,
//   RiDownload2Line,
//   RiRainbowLine,
//   RiCloudLine,
//   RiInfoI,
// } from "react-icons/ri";
// import ShadeToneCard from "../ui/card/ShadeToneCard";

// export default function VirtualTryOnSection() {
//   const [selectedFinish, setSelectedFinish] = useState("Jelly Gloss");
//   const [selectedShadeId, setSelectedShadeId] = useState("#02");
//   const [selectedShadeName, setSelectedShadeName] = useState("Berry Splash");
//   const [lightMode, setLightMode] = useState("alami");
//   const [isSplitView, setIsSplitView] = useState(false);
//   const [snapshotText, setSnapshotText] = useState("Snapshot");
//   const [shareText, setShareText] = useState("Bagikan");

//   const ShadeData = [
//     {
//       id: "#01",
//       name: "Dewy Coral",
//       tone: "Warm",
//       desc: "Warm Peach",
//       color: "#F27A7D",
//     },
//     {
//       id: "#02",
//       name: "Berry Splash",
//       tone: "Neutral / Cool",
//       desc: "Rich Berry",
//       color: "#A51D4D",
//     },
//     {
//       id: "#03",
//       name: "Peach Glow",
//       tone: "Warm",
//       desc: "Soft Nude",
//       color: "#FFA896",
//     },
//     {
//       id: "#04",
//       name: "Soft Rose",
//       tone: "Neutral",
//       desc: "Petal Pink",
//       color: "#C76B7D",
//     },
//     {
//       id: "#05",
//       name: "Dusty Mauve",
//       tone: "Cool",
//       desc: "Classy Plum",
//       color: "#935764",
//     },
//     {
//       id: "#06",
//       name: "Velvet Red",
//       tone: "All Tones",
//       desc: "Classic Crimson",
//       color: "#801026",
//     },
//   ];

//   const getLightingFilter = () => {
//     if (lightMode === "golden")
//       return "sepia(0.2) saturate(1.2) contrast(1.05)";
//     if (lightMode === "studio")
//       return "brightness(1.08) contrast(1.1) saturate(1.05)";
//     return "none";
//   };
//   const handleSnapshot = () => {
//     setSnapshotText("Tersimpan!");
//     setTimeout(() => setSnapshotText("Snapshot"), 1000);
//   };
//   const handleShare = () => {
//     setShareText("Link Disalin!");
//     setTimeout(() => setShareText("Bagikan"), 1000);
//   };

//   return (
//     <section
//       id="virtual-try-on"
//       className="relative w-full bg-primary/5 scroll-mt-20 overflow-hidden"
//     >
//       <div className="relative mx-auto max-w-340 w-full px-4 sm:px-6 lg:px-8 pt-12 pb-20">
//         <div className="mx-auto mb-12 flex flex-col items-center text-center">
//           <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-200 px-4 py-1.5 shadow-sm">
//             <RiCameraLensFill className="text-primary-800 text-lg" />
//             <span className="text-xs font-bold uppercase tracking-wider text-primary-800">
//               Augmented Reality Experience
//             </span>
//           </div>
//           <div className="font-extrabold text-xl sm:text-3xl lg:text-4xl tracking-tight text-base mb-4">
//             Studio Virtual Try-On
//           </div>
//           <p className="max-w-2xl text-base leading-relaxed">
//             Temukan warna yang memancarkan pesona autentikmu secara presisi
//             menggunakan simulasi AR real-time dengan pencahayaan adaptif.
//           </p>
//         </div>

//         <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_20px_40px_-10px_rgba(255,45,120,0.12)]">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//             <div className="lg:col-span-7 flex flex-col">
//               <div className="relative w-full h-110 md:h-135 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-gray-100">
//                 <img
//                   alt="Professional frontal beauty photography portrait of an attractive Indonesian young woman with radiant skin wearing berry pink lipstick"
//                   className="w-full h-full object-cover transition-all duration-300"
//                   id="tryon-portrait"
//                   src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKPJgmKTtYiBOaUTdQvylbAuAizioh-kcAOTklnTLLKhkYmkZmQdurFsB9e1cKMnq_h8qO8NIsH14mLiQetchEIQFmiv0MaM2SgxoN0k8Qhs82nM46w-XtvhTbuaQCyLMl4WYxQvrgY95geFiSq-mzAXA0cbFEvymFsXoD7pioqYbPF88m4qMgjU1jj1m4Y7KTWIl9qs3M1BGdBiRf1Jls5G8xlW3NEkGWsedXup1dYsj86HKW-KhP"
//                   style={{
//                     filter: getLightingFilter(),
//                     clipPath: isSplitView
//                       ? "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
//                       : "none",
//                   }}
//                 />
//                 <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3">
//                   <div className="inline-flex items-center gap-2 rounded-full bg-white backdrop-blur-md px-4 py-2 text-base/70 shadow-md">
//                     <RiEqualizerLine className="text-primary text-lg" />
//                     <span
//                       className="text-xs font-bold"
//                       id="current-shade-display"
//                     >
//                       Sedang Dicoba: {selectedShadeId} {selectedShadeName} (
//                       {selectedFinish})
//                     </span>
//                   </div>

//                   {/* ganti modenya */}
//                   <button
//                     onClick={() => setIsSplitView(!isSplitView)}
//                     className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold shadow-md text-white transition-colors ${
//                       isSplitView
//                         ? "bg-gray-900 hover:bg-black"
//                         : "bg-pink-600 hover:bg-pink-700"
//                     }`}
//                     type="button"
//                   >
//                     {isSplitView ? (
//                       <RiEyeLine className="text-base" />
//                     ) : (
//                       <RiSplitCellsHorizontal className="text-white text-lg" />
//                     )}
//                     {isSplitView
//                       ? "Mode Penuh"
//                       : "Split View (Sebelum/Sesudah)"}
//                   </button>
//                   {/* ganti modenya */}
//                 </div>
//               </div>
//               <div className="flex flex-wrap items-center justify-between gap-2 mt-4 bg-primary-50 p-3 rounded-2xl border border-gray-100">
//                 <div className="flex items-center gap-2 flex-wrap">
//                   <span className="text-xs text-base font-bold uppercase mr-1">
//                     Simulasi Cahaya :
//                   </span>
//                   {[
//                     { id: "alami", label: "Alami" },
//                     { id: "golden", label: "Golden Hour" },
//                     { id: "studio", label: "Studio Ringlight" },
//                   ].map((item) => (
//                     <button
//                       key={item.id}
//                       onClick={() => setLightMode(item.id)}
//                       className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
//                         lightMode === item.id
//                           ? "bg-primary text-white shadow-sm"
//                           : "bg-white text-base/70 hover:bg-base/10 border border-gray-200"
//                       }`}
//                       type="button"
//                     >
//                       {item.label}
//                     </button>
//                   ))}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={handleSnapshot}
//                     className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs text-base font-bold hover:bg-gray-100 transition-colors shadow-sm border border-gray-200"
//                     type="button"
//                   >
//                     {snapshotText === "Tersimpan!" ? (
//                       <RiDownload2Line className="text-green-500 text-lg" />
//                     ) : (
//                       <RiCamera4Line className="text-primary text-lg" />
//                     )}
//                     {snapshotText}
//                   </button>
//                   <button
//                     onClick={handleShare}
//                     className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs text-base font-bold hover:bg-gray-100 transition-colors shadow-sm border border-gray-200"
//                     type="button"
//                   >
//                     {shareText === "Link Disalin!" ? (
//                       <RiLink className="text-green-500 text-lg" />
//                     ) : (
//                       <RiShareLine className="text-primary text-lg" />
//                     )}
//                     {shareText}
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="lg:col-span-5 flex flex-col justify-between">
//               <div className="flex flex-col gap-6">
//                 <div>
//                   <label className="text-xs uppercase tracking-wider text-base font-bold block mb-3">
//                     Pilih Karakter Finishing :
//                   </label>
//                   <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-100">
//                     <button
//                       onClick={() => setSelectedFinish("Jelly Gloss")}
//                       className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-bold transition-all ${
//                         selectedFinish === "Jelly Gloss"
//                           ? "bg-primary text-white shadow-sm"
//                           : "text-base/70 hover:bg-base/10"
//                       }`}
//                       type="button"
//                     >
//                       <RiRainbowLine className="text-lg" /> Jelly Gloss (Juicy)
//                     </button>
//                     <button
//                       onClick={() => setSelectedFinish("Cloud Matte")}
//                       className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-bold transition-all ${
//                         selectedFinish === "Cloud Matte"
//                           ? "bg-primary text-white shadow-sm"
//                           : "text-base/70 hover:bg-base/10"
//                       }`}
//                       type="button"
//                     >
//                       <RiCloudLine className="text-lg" /> Cloud Matte (Velvet)
//                     </button>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex items-center justify-between mb-3">
//                     <label className="text-xs uppercase tracking-wider text-base font-bold">
//                       Pilihan Shade (6 Warna) :
//                     </label>
//                     <span className="text-xs text-primary-700 font-bold">
//                       98% Cocok dengan Undertone
//                     </span>
//                   </div>
//                   <div className="grid grid-cols-3 gap-3">
//                     {ShadeData.map((shade) => (
//                       <ShadeToneCard
//                         key={shade.id}
//                         shade={shade}
//                         isSelected={selectedShadeId === shade.id}
//                         onSelect={() => {
//                           setSelectedShadeId(shade.id);
//                           setSelectedShadeName(shade.name);
//                         }}
//                       />
//                     ))}
//                   </div>
//                 </div>
//                 <div className="bg-base/5 rounded-2xl p-4 flex items-start gap-3 border border-gray-100">
//                   <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white shrink-0 mt-0.5">
//                     <RiInfoI className="text-xl" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-base font-bold">
//                       Ringkasan Pilihan Kamu :
//                     </p>
//                     <p className="text-xs text-base/70 mt-1 leading-relaxed">
//                       Kamu sedang mencoba shade{" "}
//                       <strong className="text-primary">
//                         {selectedShadeId} {selectedShadeName}
//                       </strong>{" "}
//                       dengan karakter finishing{" "}
//                       <strong className="text-primary">{selectedFinish}</strong>
//                       , menghasilkan kilau segar berdaya sebar tinggi yang
//                       ringan di bibir.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-8 pt-4 bg-base/5 rounded-2xl p-4 flex items-center justify-between border border-gray-100">
//                 <div className="flex items-center gap-2">
//                   <RiFlaskLine className="text-primary text-lg shrink-0" />
//                   <span className="text-xs text-base">
//                     Ingin tahu panduan kombinasi ombre?
//                   </span>
//                 </div>
//                 <a
//                   className="text-xs font-bold text-primary hover:underline underline-offset-6 inline-flex items-center"
//                   href="#swatch-guide"
//                 >
//                   Lihat Panduan Swatch & Tone
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { useState, useRef } from "react";
import {
  RiShareLine,
  RiFlaskLine,
  RiEyeLine,
  RiSplitCellsHorizontal,
  RiLink,
  RiCameraLensFill,
  RiEqualizerLine,
  RiCamera4Line,
  RiDownload2Line,
  RiRainbowLine,
  RiCloudLine,
  RiInfoI,
  RiCloseCircleLine,
  RiExpandHorizontalSLine,
} from "react-icons/ri";
import ShadeToneCard from "../ui/card/ShadeToneCard";

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

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
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
              Augmented Reality Experience
            </span>
          </div>
          <div className="font-extrabold text-xl sm:text-3xl lg:text-4xl tracking-tight text-base mb-4">
            Studio Virtual Try-On
          </div>
          <p className="max-w-2xl text-base leading-relaxed">
            Temukan warna yang memancarkan pesona autentikmu secara presisi
            menggunakan simulasi AR real-time dengan pencahayaan adaptif.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_20px_40px_-10px_rgba(255,45,120,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 flex flex-col">
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleMouseMove}
                onMouseUp={() => setIsDragging(false)}
                onTouchEnd={() => setIsDragging(false)}
                className={`relative w-full h-110 md:h-135 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-gray-100 select-none ${
                  isSplitView ? "cursor-ew-resize" : "cursor-default"
                }`}
              >
                {/* 1. GAMBAR SEBELUM */}
                <img
                  alt="Sebelum menggunakan makeup"
                  className="absolute inset-0 w-full h-full object-cover"
                  src="assets/model.webp"
                />

                {/* 2. GAMBAR SESUDAH */}
                <div
                  className="absolute inset-0 overflow-hidden transition-all duration-75"
                  style={{
                    width: isSplitView ? `${sliderPosition}%` : "100%",
                  }}
                >
                  <img
                    alt="Sesudah menggunakan makeup"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{
                      width: containerRef.current
                        ? `${containerRef.current.clientWidth}px`
                        : "100%",
                      filter: getLightingFilter(),
                    }}
                    src="assets/model.webp"
                  />
                </div>

                {/* 3. GARIS PEMISAH SLIDER */}
                {isSplitView && (
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.6)] z-20 cursor-ew-resize flex items-center justify-center"
                    style={{ left: `${sliderPosition}%` }}
                    onMouseDown={() => setIsDragging(true)}
                    onTouchStart={() => setIsDragging(true)}
                  >
                    <div className="absolute w-0.5 h-10 bg-white rounded-full -left-2"></div>
                    <div className="absolute w-0.5 h-10 bg-white rounded-full -right-2"></div>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 z-30 pointer-events-none">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-base/70 shadow-md pointer-events-auto">
                    <RiEqualizerLine className="text-primary text-lg" />
                    <span
                      className="text-xs font-bold"
                      id="current-shade-display"
                    >
                      Sedang Dicoba: {selectedShadeId} {selectedShadeName} (
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
                      <RiCloseCircleLine className="text-white text-lg" />
                    ) : (
                      <RiSplitCellsHorizontal className="text-white text-lg" />
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
                    {snapshotText === "Tersimpan!" ? (
                      <RiDownload2Line className="text-green-500 text-lg" />
                    ) : (
                      <RiCamera4Line className="text-primary text-lg" />
                    )}
                    {snapshotText}
                  </button>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs text-base font-bold hover:bg-gray-100 transition-colors shadow-sm border border-gray-200 cursor-pointer"
                    type="button"
                  >
                    {shareText === "Link Disalin!" ? (
                      <RiLink className="text-green-500 text-lg" />
                    ) : (
                      <RiShareLine className="text-primary text-lg" />
                    )}
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
                        {selectedShadeId} {selectedShadeName}
                      </strong>{" "}
                      dengan karakter finishing{" "}
                      <strong className="text-primary">{selectedFinish}</strong>
                      , menghasilkan kilau segar berdaya sebar tinggi yang
                      ringan di bibir.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-4 bg-base/5 rounded-2xl p-4 flex items-center justify-between border border-gray-100">
                <div className="flex items-center gap-2">
                  <RiFlaskLine className="text-primary text-lg shrink-0" />
                  <span className="text-xs text-base">
                    Ingin tahu panduan kombinasi ombre?
                  </span>
                </div>
                <a
                  className="text-xs font-bold text-primary hover:underline underline-offset-6 inline-flex items-center"
                  href="#swatch-guide"
                >
                  Lihat Panduan Swatch & Tone
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
