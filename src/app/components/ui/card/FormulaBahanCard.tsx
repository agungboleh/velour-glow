import { IconType } from "react-icons";

interface FormulaBahanCardProps {
  icon: IconType;
  title: string;
  description: string;
  badge: string;
}

export default function FormulaBahanCard({
  icon: Icon,
  title,
  description,
  badge,
}: FormulaBahanCardProps) {
  return (
    <div className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-2px_rgba(255,45,120,0.06)] hover:shadow-[0_12px_30px_-4px_rgba(255,45,120,0.12)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        <div
          className={
            "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors duration-300 bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white"
          }
        >
          <Icon className="text-xl" />
        </div>
        <h3 className="text-xl text-base font-bold mb-2">{title}</h3>
        <p className="text-sm text-base/70 leading-relaxed">{description}</p>
      </div>
      <div className="mt-2 text-xs uppercase font-bold tracking-wider text-primary">
        {badge}
      </div>
    </div>
  );
}
