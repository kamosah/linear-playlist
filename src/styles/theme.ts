import { DefaultTheme } from "styled-components";

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
export const DARK_LINEAR_GRADIENT =
  "linear-gradient(to bottom, oklch(25% 0.035 261.692), oklch(13% 0.028 261.692))";
export const LIGHT_LINEAR_GRADIENT =
  "linear-gradient(to bottom, oklch(96.7% 0.003 264.542), oklch(87.2% 0.01 258.338))";

export const INDIGO_700 = "oklch(45.7% 0.24 277.023)";

export const BORDER_RADIUS_LG = "0.5rem";

export const DARK_THEME: DefaultTheme = {
  colors: {
    active: GRAY_800,
    badge: "#1e293b",
    border: GRAY_100,
    bg: GRAY_900,
    hover: GRAY_700,
    muted: GRAY_500,
    secondary: "#6366f1",
    surface: "#1e293b",
    text: GRAY_100,
    caption: "#64748b", // Fixed empty string
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
  mode: "dark",
} as const;

export const LIGHT_THEME: DefaultTheme = {
  colors: {
    active: GRAY_200,
    badge: "#e2e8f0",
    border: GRAY_400,
    bg: "oklch(96.7% 0.003 264.542)",
    caption: "#64748b",
    hover: "oklch(87.2% 0.01 258.338)",
    muted: "oklch(55.1% 0.027 264.364)",
    secondary: "#6366f1",
    surface: "#ffffff",
    text: "oklch(13% 0.028 261.692)",
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
  mode: "light",
} as const;

// Export the theme type using typeof
export type ThemeType = typeof DARK_THEME;
