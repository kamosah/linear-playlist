export const GRAY_100 = "oklch(96.7% 0.003 264.542)";
export const GRAY_200 = "oklch(92.8% 0.006 264.531)";
export const GRAY_300 = "oklch(87.2% 0.01 258.338)";
export const GRAY_400 = "oklch(70.7% 0.022 261.325)";
export const GRAY_500 = "oklch(55.1% 0.027 264.364)";
export const GRAY_600 = "oklch(44.6% 0.03 256.802)";
export const GRAY_700 = "oklch(37.3% 0.034 259.733)";
export const GRAY_800 = "oklch(27.8% 0.033 256.848)";
export const GRAY_900 = "oklch(13% 0.028 261.692)";
export const GRAY_950 = "oklch(13% 0.028 261.692)";

export const INDIGO_700 = "oklch(45.7% 0.24 277.023)";

export const BORDER_RADIUS_LG = "0.5rem";

export const DARK_THEME = {
  colors: {
    badge: "#1e293b",
    bg: GRAY_950,
    hover: GRAY_700,
    muted: GRAY_500,
    secondary: "#6366f1",
    surface: "#1e293b",
    text: GRAY_100,
    caption: "",
  },
  radii: {
    xl: "0.75rem",
  },
  spacing: {
    xxs: "0.25rem",
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
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

// Export the theme object
export default DARK_THEME;

// Export the theme type using typeof
export type ThemeType = typeof DARK_THEME;
