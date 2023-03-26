import { FC, ReactNode } from "react";

interface Props {
  type?: "submit" | "reset" | "button" | undefined;
  color?: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "ghost";
  size?: "xs" | "md" | "sm" | "lg";
  outlined?: boolean;
  lowerCased?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}
const Button: FC<Props> = ({
  type = "button",
  children,
  outlined,
  color,
  size = "sm",
  lowerCased,
  onClick,
  loading,
  className,
}) => {
  return (
    <button
      type={type}
      className={`btn${outlined ? " btn-outline" : ""} btn-${color} btn-${size}${
        lowerCased ? " lowercase" : ""
      }${loading ? " loading" : ""} ${className}`}
      onClick={() => onClick?.()}
    >
      {children}
    </button>
  );
};

export default Button;
