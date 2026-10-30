"use client";

import {
  RiFacebookFill,
  RiTwitterXFill,
  RiInstagramFill,
  RiTiktokFill,
  RiYoutubeFill,
} from "react-icons/ri";
import { IconType } from "react-icons";

interface SocialItem {
  label: string;
  href: string;
  icon: IconType;
}

export default function IconSosmed() {
  const socialLinks: SocialItem[] = [
    { label: "Instagram", href: "#", icon: RiInstagramFill },
    { label: "TikTok", href: "#", icon: RiTiktokFill },
    { label: "YouTube", href: "#", icon: RiYoutubeFill },
    { label: "Facebook", href: "#", icon: RiFacebookFill },
    { label: "TwitterX", href: "#", icon: RiTwitterXFill },
  ];

  return (
    <div className="flex items-center gap-2 pt-2">
      {socialLinks.map((social, index) => {
        const IconComponent = social.icon;
        return (
          <a
            key={index}
            aria-label={social.label}
            className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-base hover:text-primary hover:border-primary-50 hover:bg-primary-200 transition-all shadow-sm"
            href={social.href}
          >
            <IconComponent className="text-lg" />
          </a>
        );
      })}
    </div>
  );
}
