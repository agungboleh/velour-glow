"use client";

import FooterBadge from "../ui/badge/FooterBadge";
import SubscribeCard from "../ui/card/SubscribeCard";
import IconSosmed from "../ui/sosmed/IconSosmed";
import MenuFooter from "./MenuFooter";

export default function Footer() {
  return (
    <footer className="w-full bg-primary-50 border-t border-gray-100">
      <SubscribeCard />
      <div className="w-full max-w-340 mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 border-b border-base/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-14 gap-10">
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <a className="flex items-center gap-2" href="#">
              <span className="text-2xl tracking-tight text-base font-extrabold">
                VELOUR <span className="text-primary">GLOW</span>
              </span>
            </a>
            <p className="text-sm text-base/70 leading-relaxed max-w-sm">
              Clean, Conscious, &amp; Effortless Beauty. Mengharmonikan
              kemewahan pigmen velvet dan hidrasi dewy untuk merayakan
              kecantikan unik setiap perempuan Indonesia.
            </p>
            <FooterBadge />
            <IconSosmed />
          </div>
          <MenuFooter />
        </div>
      </div>
      <div className="w-full max-w-340 mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between text-base/70 text-xs text-center gap-4">
        <span>© 2026 Velour Glow Cosmetics. All rights reserved.</span>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a className="hover:text-base transition-colors" href="#">
            Kebijakan Privasi
          </a>
          <a className="hover:text-base transition-colors" href="#">
            Syarat &amp; Ketentuan
          </a>
          <a className="hover:text-base transition-colors" href="#">
            Aksesibilitas
          </a>
          <a className="hover:text-base transition-colors" href="#">
            Sertifikasi Keamanan BPOM
          </a>
        </div>
      </div>
    </footer>
  );
}
