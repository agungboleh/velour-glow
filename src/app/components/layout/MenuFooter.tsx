"use client";

interface FooterLink {
  label: string;
  href: string;
}
interface FooterColumn {
  title: string;
  spanClass: string;
  links: FooterLink[];
}

export default function MenuFooter() {
  const menuColumns: FooterColumn[] = [
    {
      title: "Jelajahi",
      spanClass: "lg:col-span-3",
      links: [
        { label: "Tentang Kami & Manifesto", href: "#" },
        { label: "Inovasi Hybrid Dual Texture", href: "#" },
        { label: "Formula Skincare 68% Aktif", href: "#" },
        { label: "Hasil Uji Dermatologis", href: "#" },
        { label: "Virtual Try-On AR Studio", href: "#" },
        { label: "Koleksi 6 Signature Shades", href: "#" },
      ],
    },
    {
      title: "Bantuan & Panduan",
      spanClass: "lg:col-span-3",
      links: [
        { label: "FAQ Virtual Try-On AR", href: "#" },
        { label: "Panduan Memilih Shade Undertone", href: "#" },
        { label: "Tutorial Ombre Lip Combos", href: "#" },
        { label: "Customer Care & Konsultasi", href: "#" },
        { label: "Layanan Pendampingan Warna", href: "#" },
      ],
    },
    {
      title: "Komitmen Kami",
      spanClass: "lg:col-span-3",
      links: [
        { label: "100% Vegan & Cruelty-Free", href: "#" },
        { label: "Clean Beauty Standards", href: "#" },
        { label: "Eco-Refill Initiative", href: "#" },
        { label: "Kemasan Daur Ulang", href: "#" },
        { label: "Sustainably Sourced Oils", href: "#" },
      ],
    },
  ];

  return (
    <>
      {menuColumns.map((col, index) => (
        <div key={index} className={`${col.spanClass} flex flex-col gap-3`}>
          <span className="text-xs font-bold uppercase tracking-wider text-base">
            {col.title}
          </span>
          <ul className="flex flex-col gap-2.5 text-sm text-base/70">
            {col.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <a
                  className="hover:text-primary transition-colors"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
