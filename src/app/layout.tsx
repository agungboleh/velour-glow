import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Velour Glow | Hybrid Lipstick",
  description:
    "Temukan lipstik hybrid Velour Glow dengan perpaduan juicy jelly shine dan airy cloud matte.",
  icons: {
    icon: "/assets/favicon.ico",
  },
  openGraph: {
    title: "Velour Glow | Hybrid Lipstick",
    description:
      "Temukan warna dan formula lipstik yang sesuai dengan gayamu.",
    type: "website",
    images: [
      {
        url: "/assets/preview-image.webp",
        width: 1200,
        height: 630,
        alt: "Velour Glow Lipstick Collection",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-background text-on-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
