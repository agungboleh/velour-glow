import { useState } from "react";
import { RiPriceTag3Line, RiCheckboxCircleLine } from "react-icons/ri";

export default function SubscribeCard() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 2000);
    }
  };
  return (
    <div className="w-full max-w-340 mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-pink-100 via-pink-50/50 to-rose-100/60 p-6 md:p-10 border border-primary-200 shadow-[0_4px_20px_-2px_rgba(255,45,120,0.06)]">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white backdrop-blur-md px-3.5 py-1.5 self-center lg:self-start mb-3 shadow-sm border border-gray-100">
              <RiPriceTag3Line className="text-primary text-sm" />
              <span className="text-xs uppercase tracking-wider text-primary font-bold">
                Exclusive Beauty Circle
              </span>
            </div>
            <p className="text-2xl md:text-3xl text-base font-extrabold tracking-tight">
              Bergabung dengan <span className="text-primary">Glow Club</span>{" "}
              ✨
            </p>
            <p className="text-sm text-base/70 mt-2 leading-relaxed">
              Dapatkan sneak peek drop shade eksklusif, undangan early access
              fitur Virtual Try-On terbaru, dan kurasi tips kecantikan personal
              langsung di inbox-mu.
            </p>
          </div>
          <div className="w-full lg:max-w-md">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2 bg-white p-1.5 rounded-full shadow-sm border border-gray-200 focus-within:border-primary transition-colors"
            >
              <input
                className="w-full px-4 py-2.5 bg-transparent text-sm text-base placeholder:text-gray-300 focus:outline-none rounded-full"
                placeholder="Masukkan email aktifmu..."
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="inline-flex items-center justify-center shrink-0 rounded-full bg-primary-700 text-white px-6 py-2.5 text-xs font-bold shadow-[0_4px_16px_-2px_rgba(255,45,120,0.3)] hover:bg-primary active:scale-95 transition-all duration-200"
                type="submit"
              >
                {isSubscribed ? "Berhasil Gabung! ✨" : "Gabung Sekarang"}
              </button>
            </form>
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-2.5 text-base/70 text-[11px] font-medium">
              <span className="flex items-center gap-1">
                <RiCheckboxCircleLine className="text-sm text-primary" /> Tanpa
                Spam
              </span>
              <span className="flex items-center gap-1">
                <RiCheckboxCircleLine className="text-sm text-primary" /> Bebas
                Berhenti Kapan Saja
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
