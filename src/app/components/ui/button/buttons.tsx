import { IconType } from "react-icons";

interface BaseButtonProps {
  label: string;
  className?: string;
  href?: string;
  onClick?: () => void;
}

interface ButtonIconProps extends BaseButtonProps {
  icon: IconType;
  size: string;
}

export default function ButtonBasic({ href, label, className, onClick }: BaseButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.location.href = href;
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {label}
    </button>
  );
}

export function ButtonIconLeft({ href, label, icon: Icon, className, size, onClick }: ButtonIconProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.location.href = href;
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      <Icon className={`mr-1 ${size}`} />
      {label}
    </button>
  );
}

export function ButtonIconRight({ href, label, icon: Icon, className, size, onClick }: ButtonIconProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.location.href = href;
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {label}
      <Icon className={`ml-1 ${size}`} />
    </button>
  );
}