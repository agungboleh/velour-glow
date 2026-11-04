"use client";
import { LIGHT_MODES, FINISHES, ShadeData } from "./tryOnData";

interface TryOnContentTabsProps {
  activeTab: "lighting" | "finishing" | "shade" | null;
  lightMode: string;
  setLightMode: (mode: string) => void;
  selectedFinish: string;
  setSelectedFinish: (finish: any) => void;
  selectedShadeId: string;
  setSelectedShadeId: (id: string) => void;
}

export function TryOnContentTabs({
  activeTab,
  lightMode,
  setLightMode,
  selectedFinish,
  setSelectedFinish,
  selectedShadeId,
  setSelectedShadeId,
}: TryOnContentTabsProps) {
  if (!activeTab) return null;

  return (
    <>
      {activeTab === "lighting" && (
        <div className="p-4 bg-base border-b border-white/10 flex items-center justify-center gap-3">
          <span className="text-xs font-bold text-white uppercase">
            Cahaya :
          </span>
          {LIGHT_MODES.map((item) => (
            <button
              key={item.id}
              onClick={() => setLightMode(item.id)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                lightMode === item.id
                  ? "bg-primary-400 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {activeTab === "finishing" && (
        <div className="p-4 bg-base border-b border-white/10 flex items-center justify-center gap-3">
          <span className="text-xs font-bold text-white uppercase">
            Karakter Finishing :
          </span>
          {FINISHES.map((finish) => (
            <button
              key={finish}
              onClick={() => setSelectedFinish(finish)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                selectedFinish === finish
                  ? "bg-primary-400 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {finish}
            </button>
          ))}
        </div>
      )}

      {activeTab === "shade" && (
        <div className="p-4 bg-base border-b border-white/10 max-h-56 overflow-y-auto">
          <span className="text-xs font-bold uppercase text-white mb-2 block">
            Pilihan Shade :
          </span>
          <div className="grid grid-cols-3 gap-2">
            {ShadeData.map((shade) => (
              <button
                key={shade.id}
                onClick={() => setSelectedShadeId(shade.id)}
                className={`flex flex-col items-center p-2 rounded-xl border transition cursor-pointer ${
                  selectedShadeId === shade.id
                    ? "border-primary bg-primary/20 text-white"
                    : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
                type="button"
              >
                <span
                  className="w-25 h-10 rounded-xl mb-1 shadow-inner border border-white/20"
                  style={{ backgroundColor: shade.color }}
                />
                <span className="text-[11px] font-bold leading-tight">
                  {shade.id} {shade.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
