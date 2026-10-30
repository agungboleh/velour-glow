"use client";
import { RiHeartsFill, RiVerifiedBadgeLine } from "react-icons/ri";
import FilosofiCard from "../ui/card/FilosofiCard";

export default function FilosofiSection() {
  const FilosofiCardData = [
    {
      review:
        "Teksturnya bener-bener seperti awan tapi ada pantulan basah yang dewy sehat! Gak bikin garis bibir terlihat kering walau dipakai dari pagi sampai malam.",
      initial: "AN",
      name: "Anindya Nadira",
      profession: "Beauty Enthusiast & Chemist",
    },
    {
      review:
        "Fitur Virtual Try-On nya super akurat mendeteksi undertone kulitku yang sawo matang. Shade #02 Berry Splash langsung jadi warna andalan baruku!",
      initial: "CL",
      name: "Clarissa Larasati",
      profession: "Creative Director",
    },
  ];

  return (
    <section
      id="formula-bahan"
      className="w-full bg-primary/5 py-16 md:py-24 scroll-mt-10"
    >
      <div className="w-full max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-200 px-4 py-1.5 shadow-sm">
              <RiHeartsFill className="text-primary-800 text-lg" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary-800">
                Filosofi Velour Glow
              </span>
            </div>
            <div className="text-3xl md:text-4xl text-base font-extrabold tracking-tight mb-4">
              Kecantikan yang Jujur, Sadar, & Menyenangkan
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-on-surface-variant mb-8">
              Kami percaya bahwa riasan tidak boleh menutupi keaslian diri,
              melainkan merayakan keunikan yang telah ada. Dengan pendekatan
              clean skincare science, kami menghapus batas antara makeup
              dekoratif dan nutrisi perawatan kulit.
            </p>
            <div className="w-full rounded-3xl p-6 border border-primary-200 shadow-[0_4px_20px_-2px_rgba(255,45,120,0.06)]">
              <div className="inline-flex gap-2 text-primary">
                <RiVerifiedBadgeLine className="text-xl" />
                <span className="text-sm font-bold">
                  Dermatologically Tested for Sensitive Lips
                </span>
              </div>
              <p className="text-sm text-base/70">
                Telah diuji klinis di bawah pengawasan dokter spesialis kulit
                dengan hasil hipoalergenik dan non-iritatif pada 120 partisipan.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FilosofiCardData.map((item, index) => (
              <FilosofiCard
                key={index}
                review={item.review}
                initial={item.initial}
                name={item.name}
                profession={item.profession}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
