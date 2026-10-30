import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import FilosofiSection from "./components/sections/Filosofi";
import FormulaBahanSection from "./components/sections/FormulaBahan";
import KeunggulanSection from "./components/sections/Keunggulan";
import PilihanShadeSection from "./components/sections/PilihanShade";
import TentangProdukSection from "./components/sections/TentangProduk";
import VirtualTryOnSection from "./components/sections/VirtualTryOn";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <TentangProdukSection />
        <KeunggulanSection />
        <FormulaBahanSection />
        <PilihanShadeSection />
        <VirtualTryOnSection />
        <FilosofiSection />
      </main>
      <Footer />
    </>
  );
}