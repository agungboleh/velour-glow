"use client";
import { RiInfoI } from "react-icons/ri";

interface TryOnSummaryCardProps {
  currentShade: {
    id: string;
    name: string;
  };
  selectedFinish: string;
}

export default function TryOnSummaryCard({
  currentShade,
  selectedFinish,
}: TryOnSummaryCardProps) {
  return (
    <div className="bg-base/5 rounded-2xl p-4 flex items-start gap-3 border border-gray-100">
      <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white shrink-0 mt-0.5">
        <RiInfoI className="text-xl" />
      </div>
      <div>
        <p className="text-xs text-base font-bold">Ringkasan Pilihan Kamu :</p>
        <p className="text-xs text-base/70 mt-1 leading-relaxed">
          Kamu sedang mencoba shade{" "}
          <strong className="text-primary">
            {currentShade.id} {currentShade.name}
          </strong>{" "}
          dengan finishing{" "}
          <strong className="text-primary">{selectedFinish}</strong>.
        </p>
      </div>
    </div>
  );
}
