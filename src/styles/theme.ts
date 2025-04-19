export const GRAY_100 = "oklch(96.7% 0.003 264.542)";
export const GRAY_500 = "oklch(55.1% 0.027 264.364)";
export const GRAY_800 = "oklch(27.8% 0.033 256.848)";
export const GRAY_950 = "oklch(13% 0.028 261.692)";

export const BORDER_RADIUS_LG = "0.5rem";

export const DARK_THEME = {
  colors: {
    badge: "#1e293b",
    bg: GRAY_950,
    hover: GRAY_800,
    muted: GRAY_500,
    secondary: "#6366f1",
    surface: "#1e293b",
    text: "#f8fafc",
    caption: "",
  },
  radii: {
    xl: "0.75rem",
  },
  spacing: {
    sm: "0.375rem 0.75rem",
    md: "0.5rem 1rem",
    lg: "0.75rem 1.5rem",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
  },
  border: {
    lg: "0.5rem",
    md: "0.25rem",
    sm: "0.125rem",
  },
} as const;
