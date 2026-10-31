// "use client";

// interface LipMaskOverlayProps {
//   color: string;
//   finish: string;
//   isSplitView: boolean;
//   sliderPosition: number;
// }
// const FINISH_OPACITY: Record<string, number> = {
//   "Jelly Gloss": 0.5,
//   "Cloud Matte": 0.7,
// };

// export default function LipMaskOverlay({
//   color,
//   finish,
//   isSplitView,
//   sliderPosition,
// }: LipMaskOverlayProps) {
//   const opacity = FINISH_OPACITY[finish] || 0.7;
//   const isGlossy = finish === "Jelly Gloss";
//   const lipPathData =
//     "M80.1982 8.96971C94.5005 -8.53005 161.501 4.96975 161.501 4.96975C161.501 4.96975 133.298 63.8583 86.0005 69.4697C56.5 72.9697 13.5 54.4697 3.47204e-09 24.4697C-0.000488279 21.4697 51.5005 -2.53004 80.1982 8.96971ZM82.6982 22.4698C72.5 24.4697 57 22.4698 28.5 22.4698C7.94777 22.4698 3.47204e-09 24.4697 3.47204e-09 24.4697C3.47204e-09 24.4697 34.0005 48.9697 82.6982 43.4697C133.265 37.7587 161.501 4.96975 161.501 4.96975C161.501 4.96975 144.5 2.23557 123.5 10.4697C111.524 13.0843 86.0005 22.4698 82.6982 22.4698Z";

//   return (
//     <div
//       className="absolute z-10 transition-all duration-200 pointer-events-none"
//       style={{
//         top: "45.2%",
//         left: "45.8%",
//         width: "11%",
//         height: "7%",
//         clipPath: isSplitView ? `inset(0 0 0 ${sliderPosition}%)` : "none",
//       }}
//     >
//       <svg
//         viewBox="0 0 162 70"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         className="w-full h-full overflow-visible"
//         style={{
//           mixBlendMode: "multiply",
//           opacity: opacity,
//           filter: "blur(0.5px)",
//         }}
//       >
//         <defs>
//           <linearGradient id="softGloss" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
//             <stop offset="40%" stopColor="#ffffff" stopOpacity="0.0" />
//           </linearGradient>
//         </defs>
//         <path d={lipPathData} fill={color} />
//         {isGlossy && (
//           <path
//             d={lipPathData}
//             fill="url(#softGloss)"
//             style={{ mixBlendMode: "screen" }}
//           />
//         )}
//       </svg>
//     </div>
//   );
// }


"use client";

interface LipMaskOverlayProps {
  color: string;
  finish: string;
  isSplitView: boolean;
  sliderPosition: number;
}

const FINISH_OPACITY: Record<string, number> = {
  "Jelly Gloss": 0.5,
  "Cloud Matte": 0.7,
};

export default function LipMaskOverlay({
  color,
  finish,
}: LipMaskOverlayProps) {
  const opacity = FINISH_OPACITY[finish] || 0.7;
  const isGlossy = finish === "Jelly Gloss";

  const lipPathData = "M80.1982 8.96971C94.5005 -8.53005 161.501 4.96975 161.501 4.96975C161.501 4.96975 133.298 63.8583 86.0005 69.4697C56.5 72.9697 13.5 54.4697 3.47204e-09 24.4697C-0.000488279 21.4697 51.5005 -2.53004 80.1982 8.96971ZM82.6982 22.4698C72.5 24.4697 57 22.4698 28.5 22.4698C7.94777 22.4698 3.47204e-09 24.4697 3.47204e-09 24.4697C3.47204e-09 24.4697 34.0005 48.9697 82.6982 43.4697C133.265 37.7587 161.501 4.96975 161.501 4.96975C161.501 4.96975 144.5 2.23557 123.5 10.4697C111.524 13.0843 86.0005 22.4698 82.6982 22.4698Z";

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: "45.2%",
        left: "45.8%",
        width: "11%",
        height: "7%",
      }}
    >
      <svg
        viewBox="0 0 162 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        style={{
          mixBlendMode: "multiply",
          opacity: opacity,
          filter: "blur(0.5px)",
        }}
      >
        <defs>
          <linearGradient id="softGloss" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <path d={lipPathData} fill={color} />

        {isGlossy && (
          <path
            d={lipPathData}
            fill="url(#softGloss)"
            style={{ mixBlendMode: "screen" }}
          />
        )}
      </svg>
    </div>
  );
}