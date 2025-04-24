import { ReactElement } from "react";
type variants = "primary" | "secondary";
export interface ButtonProps {
  variant: variants;
  text: string;
  startIcon?: ReactElement;
  size: "sm" | "md" | "lg";
  endIcon?: any;
  onClick: () => void;
}
const variantStyle = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-300 text-purple-600",
};

const defaultStyles = "rounded-md flex gap-2";

const sizeStyle = {
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
};

export const Button = ({
  text,
  variant,
  onClick,
  size,
  startIcon,
  endIcon,
}: ButtonProps) => {
  return (
    <>
      <button
        className={`${variantStyle[variant]} ${defaultStyles}  ${sizeStyle[size]}`}
      >
        {startIcon} {/* */} {text}
        
      </button>
    </>
  );
};
