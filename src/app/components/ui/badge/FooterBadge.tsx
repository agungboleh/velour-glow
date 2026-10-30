"use client";

import {
  RiVerifiedBadgeLine,
  RiLeafLine,
  RiCertificate2Line,
} from "react-icons/ri";
import { IconType } from "react-icons";

interface BadgeItem {
  label: string;
  icon: IconType;
}

export default function FooterBadge() {
  const badges: BadgeItem[] = [
    { label: "BPOM Resmi", icon: RiVerifiedBadgeLine },
    { label: "100% Vegan", icon: RiLeafLine },
    { label: "Halal Certified", icon: RiCertificate2Line },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      {badges.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <span
            key={index}
            className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs text-base font-semibold border border-gray-100"
          >
            <IconComponent className="text-primary text-lg" />
            {item.label}
          </span>
        );
      })}
    </div>
  );
}