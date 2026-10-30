"use client";
import {
  RiCheckLine,
  RiContrastDrop2Line,
  RiDropperFill,
  RiBubbleChartFill,
  RiShieldCrossLine,
  RiFlowerFill,
} from "react-icons/ri";
import FormulaBahanCard from "../ui/card/FormulaBahanCard";

export default function FormulaBahanSection() {
  const FormulaBahanData = [
    {
      icon: RiContrastDrop2Line,
      title: "Triple Hyaluronic Acid",
      description:
        "Tiga ukuran molekul asam hialuronat yang meresap ke lapisan terdalam untuk mengunci air, memberi hidrasi berkesinambungan hingga 24 jam.",
      badge: "Deep Moisture Plump",
    },
    {
      icon: RiDropperFill,
      title: "Organic Jojoba & Almond",
      description:
        "Cold-pressed oil kaya asam lemak esensial yang memulihkan elastisitas bibir kering bersisik dan mengembalikan kelembutan alaminya.",
      badge: "Barrier Restoration",
    },
    {
      icon: RiBubbleChartFill,
      title: "Botanical Peptides",
      description:
        "Rantai peptida nabati murni yang mendorong sintesis kolagen alami, menjadikan garis bibir lebih terisi, halus, dan awet muda.",
      badge: "Volume Enhancer",
    },
    {
      icon: RiShieldCrossLine,
      title: "Vitamin E + Antioksidan",
      description:
        "Perisai antioksidan kuat terhadap polusi urban dan paparan sinar UV yang memicu hiperpigmentasi dan penggelapan warna bibir.",
      badge: "Cellular Protection",
    },
  ];

  return (
    <section
      id="formula-bahan"
      className="w-full bg-primary/5 py-16 md:py-24 scroll-mt-10"
    >
      <div className="w-full max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-200 px-4 py-1.5 shadow-sm">
              <RiFlowerFill className="text-primary-800 text-lg" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary-800">
                Skincare-First Formula
              </span>
            </div>
            <div className="text-3xl md:text-4xl text-base font-extrabold tracking-tight mb-4">
              Bukan Sekadar Warna, Tapi Nutrisi Intensif
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-on-surface-variant mb-8">
              Setiap sapuan Velour Glow diformulasikan dengan 68% bahan aktif
              perawatan bibir yang terbukti secara klinis menjaga barrier bibir
              tetap sehat, plum, dan kenyal meski sehabis seharian menggunakan
              riasan.
            </p>
            <div className="w-full bg-primary/10 rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_-2px_rgba(255,45,120,0.06)]">
              <span className="text-xs uppercase tracking-widest text-gray-900 font-bold block mb-4">
                Jaminan Mutu &amp; Standar Kebersihan :
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium text-secondary">
                <span className="flex items-center gap-2">
                  <RiCheckLine className="text-primary text-lg shrink-0" /> 100%
                  Vegan &amp; Halal
                </span>
                <span className="flex items-center gap-2">
                  <RiCheckLine className="text-primary text-lg shrink-0" />{" "}
                  Cruelty-Free Certified
                </span>
                <span className="flex items-center gap-2">
                  <RiCheckLine className="text-primary text-lg shrink-0" /> BPOM
                  Registered
                </span>
                <span className="flex items-center gap-2">
                  <RiCheckLine className="text-primary text-lg shrink-0" />{" "}
                  Bebas Paraben &amp; Sulfat
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FormulaBahanData.map((item, index) => (
              <FormulaBahanCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                badge={item.badge}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
