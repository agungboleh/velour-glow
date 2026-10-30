"use client";
import { useState, useEffect } from "react";
import { RiMenuLine, RiCloseLargeLine } from "react-icons/ri";
import ButtonBasic from "../ui/button/buttons";

const navLinks = [
  { label: "Tentang Produk", href: "#tentang-produk" },
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Formula & Bahan", href: "#formula-bahan" },
  { label: "Pilihan Shade", href: "#pilihan-shade" },
  { label: "Virtual Try-On", href: "#virtual-try-on" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#tentang-produk");
  const closeMenu = () => setIsMenuOpen(false);
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 150;
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-primary-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-340 items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          onClick={closeMenu}
          className="shrink-0 text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl ml-2 lg:ml-0"
        >
          VELOUR <span className="text-primary">GLOW</span>
        </a>
        <nav className="hidden items-center gap-5 xl:flex xl:gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveSection(link.href)}
                className={`whitespace-nowrap text-sm transition-colors duration-200 hover:text-primary ${
                  isActive
                    ? "font-black text-primary"
                    : "font-semibold text-secondary"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-5">
          <ButtonBasic
            href="#try-on-section"
            label="Coba Virtual Try-On ✨"
            className="hidden items-center justify-center rounded-full bg-primary-700 px-5 py-3 text-sm font-bold text-white shadow-[0_4px_20px_-2px_rgba(255,45,120,0.25)] transition duration-200 hover:bg-primary-400 active:scale-95 sm:inline-flex"
          />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full text-base transition hover:bg-primary-light xl:hidden"
          >
            {isMenuOpen ? (
              <RiCloseLargeLine className="h-5 w-5" />
            ) : (
              <RiMenuLine className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navigasi mobile"
          className="border-t border-black/5 bg-primary-light px-4 pb-5 pt-3 shadow-lg xl:hidden"
        >
          <div className="mx-auto flex max-w-340 flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.href);
                    closeMenu();
                  }}
                  className={`rounded-xl px-4 py-3 text-sm transition-colors hover:bg-primary-light hover:text-primary ${
                    isActive
                      ? "font-bold text-primary bg-primary/10"
                      : "font-semibold text-secondary"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="#try-on-section"
              onClick={closeMenu}
              className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-primary-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-400 active:scale-95 sm:hidden"
            >
              Coba Virtual Try-On ✨
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
