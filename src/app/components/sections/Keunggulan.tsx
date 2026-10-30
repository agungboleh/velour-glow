"use client";
import {
  RiBrushFill,
  RiCheckboxCircleLine,
  RiPaletteLine,
  RiQuillPenLine,
  RiTimeLine,
  RiWindyFill,
} from "react-icons/ri";
import KeunggulanCard from "../ui/card/KeunggulanCard";

export default function KeunggulanSection() {
  const keunggulanData = [
    {
      icon: RiQuillPenLine,
      number: "01",
      feature: "Tekstur",
      title: "Hybrid Dual Texture",
      description:
        "Hasil akhir unik yang mengaburkan garis halus bibir (blur-effect) seketika tanpa sensasi dempul ataupun retak.",
      badgeText: "Smooth Blur Effect",
      badgeIcon: RiCheckboxCircleLine,
    },
    {
      icon: RiTimeLine,
      number: "02",
      feature: "Ketahanan",
      title: "16H Weightless Stain",
      description:
        "Pigmen mikro mengunci sempurna pada bibir, tahan luntur seharian namun tetap dapat dibersihkan dengan lembut tanpa ditarik.",
      badgeText: "Transfer-Resistant",
      badgeIcon: RiCheckboxCircleLine,
    },
    {
      icon: RiWindyFill,
      number: "03",
      feature: "Kenyamanan",
      title: "Zero Sticky Sensation",
      description:
        "Formula seringan gumpalan awan yang memberikan sensasi bibir telanjang (bare-lip feel), bebas lengket seharian.",
      badgeText: "Airy Comfort",
      badgeIcon: RiCheckboxCircleLine,
    },
    {
      icon: RiPaletteLine,
      number: "04",
      feature: "Pigmentasi",
      title: "Adaptive Color Balance",
      description:
        "Secara adaptif menyatu dengan temperatur dan rona bibir asli, menciptakan gradasi personal yang flattering untuk semua undertone.",
      badgeText: "Personalized Tone",
      badgeIcon: RiCheckboxCircleLine,
    },
  ];

  return (
    <section
      id="keunggulan"
      className="relative w-full bg-primary/5 scroll-mt-20 overflow-hidden"
    >
      <div className="relative mx-auto max-w-340 w-full px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="mx-auto mb-12 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-200 px-4 py-1.5 shadow-sm">
            <RiBrushFill className="text-primary-800 text-lg" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary-800">
              Sensori & Performa
            </span>
          </div>
          <div className="font-extrabold text-xl sm:text-3xl lg:text-4xl tracking-tight text-base mb-4">
            Kenyamanan Tanpa Kompromi
          </div>
          <p className="max-w-2xl text-base leading-relaxed">
            Teknologi emulsifikasi termutakhir menghadirkan warna intensif yang
            merawat sekaligus membebaskan bibir dari rasa berat.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keunggulanData.map((item, index) => (
            <KeunggulanCard
              key={index}
              icon={item.icon}
              number={item.number}
              feature={item.feature}
              title={item.title}
              description={item.description}
              badgeText={item.badgeText}
              badgeIcon={item.badgeIcon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
