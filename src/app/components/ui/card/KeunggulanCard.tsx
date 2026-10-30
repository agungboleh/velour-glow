import { IconType } from "react-icons";

interface KeunggulanCardProps {
  icon: IconType;
  number: string;
  feature: string;
  title: string;
  description: string;
  badgeText: string;
  badgeIcon: IconType;
}

export default function KeunggulanCard({
  icon: Icon,
  number,
  feature,
  title,
  description,
  badgeText,
  badgeIcon: BadgeIcon,
}: KeunggulanCardProps) {
  return (
    <div className="group bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_4px_20px_-2px_rgba(255,45,120,0.06)] hover:shadow-[0_12px_30px_-4px_rgba(255,45,120,0.12)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
      <div>
        <div className="w-12 h-12 rounded-full bg-primary-50 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-secondary">
          {number} • {feature}
        </span>
        <h3 className="text-xl text-base mt-2 mb-3 font-bold">{title}</h3>
        <p className="text-sm text-base/70 leading-relaxed">{description}</p>
      </div>
      <div className="mt-6">
        <span className="inline-flex items-center gap-1.5 text-xs md:text-sm text-primary-500 font-semibold">
          {badgeText}
          <BadgeIcon className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}
