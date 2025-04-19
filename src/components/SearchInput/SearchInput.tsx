import { tv, type VariantProps } from "tailwind-variants";
import React from "react";
import { Search } from "lucide-react";

const searchInput = tv({
  base: "flex items-center gap-2 rounded-xl bg-surface text-text focus-within:ring-2 focus-within:ring-secondary transition",
  variants: {
    withIcon: {
      true: "pl-3 pr-4",
      false: "px-4",
    },
    size: {
      sm: "h-8 text-sm",
      md: "h-10 text-base",
      lg: "h-12 text-lg",
    },
  },
  defaultVariants: {
    withIcon: true,
    size: "md",
  },
});

const inputField = tv({
  base: "bg-transparent outline-none w-full placeholder-muted text-text",
});

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof searchInput>;

export const SearchInput: React.FC<SearchInputProps> = ({
  className,
  size,
  withIcon = true,
  ...props
}) => {
  return (
    <div className={searchInput({ withIcon, size, className })}>
      {withIcon && <Search className="w-4 h-4 text-muted" />}
      <input
        type="text"
        className={inputField()}
        placeholder="Search..."
        {...props}
      />
    </div>
  );
};
