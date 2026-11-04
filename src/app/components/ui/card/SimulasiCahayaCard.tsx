"use client";

interface SimulasiCahayaCardProps {
  lightMode: string;
  setLightMode: (id: string) => void;
}

export default function SimulasiCahayaCard({
  lightMode,
  setLightMode,
}: SimulasiCahayaCardProps) {
  const lightingOptions = [
    { id: "alami", label: "Alami" },
    { id: "golden", label: "Golden Hour" },
    { id: "studio", label: "Studio Ringlight" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 bg-primary-50 p-3 rounded-2xl border border-gray-100">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-base font-bold uppercase mr-1">
          Simulasi Cahaya :
        </span>
        {lightingOptions.map((item) => (
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
    </div>
  );
}