import { IconType } from "react-icons";

interface ButtonProps {
  href: string;
  label: string;
  className?: string;
}
interface ButtonIconProps extends ButtonProps {
    icon: IconType;
    size: string;
}

export default function ButtonBasic({ href, label, className }: ButtonProps) {
  return (
    <button type="button" onClick={() => window.location.href = href} className={className}>
      {label}
    </button>
  );
}

export function ButtonIconLeft({ href, label, icon: Icon, className, size }: ButtonIconProps) {
  return (
    <button type="button" onClick={() => window.location.href = href} className={className}>
      <Icon className={`mr-1 ${size}`} />
      {label}
    </button>
  );
}

export function ButtonIconRight({ href, label, icon: Icon, className, size }: ButtonIconProps) {
  return (
    <button type="button" onClick={() => window.location.href = href} className={className}>
      {label}
      <Icon className={`ml-1 ${size}`} />
    </button>
  );
}