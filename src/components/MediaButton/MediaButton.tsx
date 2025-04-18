import React from "react";
import { clsx } from "clsx";

// type MediaButtonVariant = "shuffle" | "prev" | "play-pause" | "next" | "repeat";

interface MediaButtonBaseProps {
  //   variant: MediaButtonVariant;
  isActive?: boolean;
  "aria-label": string;
  children: React.ReactNode;
}

type MediaButtonProps = MediaButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const MediaButton = React.forwardRef<
  HTMLButtonElement,
  MediaButtonProps
>(({ isActive = false, className, children, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      className={clsx([isActive && "active", className])}
      {...rest}
    >
      {children}
    </button>
  );
});
