"use client";
import { RiAppsFill } from "react-icons/ri";
import PilihanShadeCard from "../ui/card/PilihanShadeCard";

export default function PilihanShadeSection() {
  const PilihanShadeData = [
    {
      image: "assets/01-dewy-coral.webp",
      badgeImage: "Dewy Shine",
      number: "01",
      name: "Dewy Coral",
      badgeText: "Warm Tone",
      description:
        "Percikan warna koral cerah dengan hint oranye keemasan. Memberikan kesegaran instan untuk aktivitas outdoor dan gaya riasan no-makeup look.",
    },
    {
      image: "assets/02-berry-splash.webp",
      badgeImage: "Signature Pick",
      number: "02",
      name: "Berry Splash",
      badgeText: "Neutral / Cool",
      description:
        "Warna buah berry ranum dengan kedalaman memikat. Sangat ideal diaplikasikan penuh atau sebagai warna titik pusat ombre lips kekinian.",
    },
    {
      image: "assets/03-peach-glow.webp",
      badgeImage: "Juicy Jelly",
      number: "03",
      name: "Peach Glow",
      badgeText: "Warm Light",
      description:
        "Nude persik lembut bergradasi alami. Menghadirkan kesan bibir sehat terawat tanpa terkesan pucat untuk penampilan harian profesional.",
    },
    {
      image: "assets/04-soft-rose.webp",
      badgeImage: "Velvet Cloud",
      number: "04",
      name: "Soft Rose",
      badgeText: "Neutral Undertone",
      description:
        "Keanggunan kelopak mawar merah muda yang universal. Menyatu cantik dengan seluruh ragam skintone wanita Nusantara.",
    },
    {
      image: "assets/05-dusty-mauve.webp",
      badgeImage: "Airy Matte",
      number: "05",
      name: "Dusty Mauve",
      badgeText: "Cool Tone",
      description:
        "Sentuhan mauve dingin yang modern dan edgy. Memberi statement elegan yang tenang untuk momen santai maupun perjumpaan formal.",
    },
    {
      image: "assets/06-velvet-red.webp",
      badgeImage: "Intense Bold",
      number: "06",
      name: "Velvet Red",
      badgeText: "Universally Flattering",
      description:
        "Merah beludru klasik dengan dasar netral berkelas. Membangkitkan rasa percaya diri tinggi dengan ketegasan warna yang mewah.",
    },
  ];

  return (
    <section id="pilihan-shade" className="w-full bg-primary-50 py-16 md:py-24 scroll-mt-10 ">
      <div className="w-full max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-200 px-4 py-1.5 shadow-sm">
              <RiAppsFill className="text-primary-800 text-lg" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary-800">
                Swatch & Tone Library
              </span>
            </div>
            <h2 className="font-extrabold text-xl sm:text-3xl lg:text-4xl tracking-tight text-base">
              Eksplorasi Spektrum Warna
            </h2>
          </div>
          <p className="text-base max-w-md leading-relaxed">
            Dirancang dengan pigmentasi berdaya sebar tinggi untuk tampilan
            bibir segar natural ala Parisian chic hingga glamor modern.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PilihanShadeData.map((item, index) => (
            <PilihanShadeCard
              key={index}
              image={item.image}
              badgeImage={item.badgeImage}
              number={item.number}
              name={item.name}
              badgeText={item.badgeText}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
