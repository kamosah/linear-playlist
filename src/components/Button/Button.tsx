// components/Button.tsx
import { tv, type VariantProps } from "tailwind-variants";
import React from "react";

const button = tv({
  //   base: "rounded-xl font-medium transition focus:outline-none inline-flex items-center justify-center",
  base: "rounded-xl font-medium transition focus:outline-none inline-flex items-center justify-center",
  variants: {
    variant: {
      // primary: "bg-gray-800 text-text hover:bg-hover",
      primary:
        "text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700",
      //   secondary:
      //     "bg-transparent text-secondary border border-secondary hover:bg-hover",
    },
    size: {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  size,
  type = "button",
  variant,
  ...props
}) => {
  return (
    <button
      type={type}
      className={button({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
};
