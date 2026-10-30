"use client";

interface Shade {
  id: string;
  name: string;
  tone: string;
  desc: string;
  color: string;
}

interface ShadeToneCardProps {
  shade: Shade;
  isSelected: boolean;
  onSelect: () => void;
}

export default function ShadeToneCard({
  shade,
  isSelected,
  onSelect,
}: ShadeToneCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`flex flex-col items-center p-3 rounded-2xl transition-all text-left w-full group border cursor-pointer ${
        isSelected
          ? "bg-primary-50 border-2 border-primary shadow-sm"
          : "bg-base/5 border-2 border-gray-100 hover:bg-base/10"
      }`}
      type="button"
    >
      <span
        className="w-8 h-8 rounded-full shadow-inner mb-2 transition-transform group-hover:scale-110 shrink-0"
        style={{ backgroundColor: shade.color }}
      ></span>
      <span
        className={`text-sm font-bold truncate w-full text-center ${
          isSelected ? "text-primary" : "text-base"
        }`}
      >
        {shade.id} {shade.name}
      </span>
      <span className="text-xs text-secondary truncate w-full text-center">
        {shade.desc}
      </span>
    </button>
  );
}
