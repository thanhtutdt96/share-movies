import { FC, memo, ReactNode } from "react";

interface Props {
  type?: "submit" | "reset" | "button" | undefined;
  color?: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "ghost";
  outlined?: boolean;
  lowerCased?: boolean;
  loading?: boolean;
  className?: string;
  dataTestId?: string;
  onClick?: () => void;
  children: ReactNode;
}
const Button: FC<Props> = ({
  type = "button",
  children,
  outlined,
  color,
  lowerCased,
  onClick,
  loading,
  className,
  dataTestId,
}) => {
  return (
    <button
      type={type}
      className={`btn${outlined ? " btn-outline" : ""} btn-${color} btn-sm${
        lowerCased ? " lowercase" : ""
      }${loading ? " loading" : ""} ${className}`}
      data-testid={dataTestId}
      onClick={() => onClick?.()}
    >
      {children}
    </button>
  );
};

export default memo(Button);
