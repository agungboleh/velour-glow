"use client";
import { RiRainbowLine, RiCloudLine } from "react-icons/ri";

interface FinishingSelectorProps {
  selectedFinish: string;
  setSelectedFinish: (finish: string) => void;
}

export default function FinishingSelector({
  selectedFinish,
  setSelectedFinish,
}: FinishingSelectorProps) {
  return (
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
  );
}
