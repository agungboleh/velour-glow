"use client";
import {
  RiArrowDownLine,
  RiVideoOnLine,
  RiSparklingFill,
} from "react-icons/ri";
import { ButtonIconLeft, ButtonIconRight } from "../ui/button/buttons";

export default function TentangProdukSection() {
  return (
    <section
      id="tentang-produk"
      className="relative w-full bg-primary/5 scroll-mt-20 py-14 md:py-20 overflow-hidden"
    >
      <div className="relative mx-auto max-w-340 w-full px-4 sm:px-6 lg:px-8 pt-12">
        <div className="mx-auto mb-12 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-200 px-4 py-1.5 shadow-sm">
            <RiSparklingFill className="text-primary-800 text-lg" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary-800">
              Inovasi Hybrid Terbaru 2026
            </span>
          </div>
          <div className="font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-base mb-4">
            The New Hybrid Era :{" "}
            <span className="text-primary">Velour Glow</span>
          </div>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-on-surface-variant">
            Inovasi lipstik hybrid pertama yang menggabungkan kelembapan{" "}
            <span className="font-semibold text-on-surface">
              juicy jelly shine
            </span>{" "}
            dengan kelembutan{" "}
            <span className="font-semibold text-on-surface">
              airy cloud matte
            </span>{" "}
            dalam satu pulasan seringan sutra.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <ButtonIconLeft
              href="#try-on-section"
              label="Coba di Wajahmu (Virtual Try-On) ✨"
              icon={RiVideoOnLine}
              className="cursor-pointer inline-flex items-center rounded-full bg-primary-700 px-8 py-4 text-sm font-bold text-white shadow-[0_10px_24px_-4px_rgba(255,45,120,0.3)] transition-transform active:scale-95 hover:bg-primary-400"
              size="text-xl"
            />
            <ButtonIconRight
              href="#formula-section"
              label="Jelajahi Formula & Bahan"
              icon={RiArrowDownLine}
              className="cursor-pointer inline-flex items-center rounded-full bg-white text-primary px-6 py-4 text-sm font-bold shadow-sm transition-transform active:scale-95 hover:bg-gray-200"
              size="text-xl"
            />
          </div>
        </div>
        <div className="relative w-full rounded-4xl overflow-hidden bg-white p-3 md:p-4 shadow-[0_4px_20px_-2px_rgba(255,45,120,0.06)] border border-gray-100">
          <div className="relative w-full h-95 md:h-135 rounded-3xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <img
              alt="Velour Glow Lipstick Hybrid Collection"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              src="assets/hero.webp"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 md:p-10 text-white pointer-events-none">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 self-start">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Dual Finish Harmony
                </span>
              </div>
              <p className="text-xl md:text-2xl font-bold text-white">
                Juicy Shine. Soft Focus Matte. Your Vibe, Your Glow.
              </p>
              <p className="text-sm text-white max-w-xl mt-1">
                6 pilihan shade segar berpadu sempurna dengan rona natural
                setiap bibir wanita Indonesia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
