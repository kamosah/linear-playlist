export const GRAY_100 = "oklch(96.7% 0.003 264.542)";
export const GRAY_200 = "oklch(92.8% 0.006 264.531)";
export const GRAY_300 = "oklch(87.2% 0.01 258.338)";
export const GRAY_400 = "oklch(70.7% 0.022 261.325)";
export const GRAY_500 = "oklch(55.1% 0.027 264.364)";
export const GRAY_700 = "oklch(37.3% 0.034 259.733)";
export const GRAY_800 = "oklch(27.8% 0.033 256.848)";
export const GRAY_900 = "oklch(13% 0.028 261.692)";
export const GRAY_950 = "oklch(13% 0.028 261.692)";

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

// Material UI Theme Object
type Mode = "dark" | "light";
const getTheme = (mode: Mode = "dark") => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  direction: "ltr",
  palette: {
    mode: mode, // 'light' or 'dark'
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    primary: {
      // Purple color from the logo and selected item
      main: "#6366F1",
      light: "#8286F5",
      dark: "#4F51C0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#64748B",
      light: "#94A3B8",
      dark: "#475569",
      contrastText: "#ffffff",
    },
    error: {
      main: "#EF4444",
      light: "#F87171",
      dark: "#B91C1C",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#F59E0B",
      light: "#FBBF24",
      dark: "#D97706",
      contrastText: "#ffffff",
    },
    info: {
      main: "#3B82F6",
      light: "#60A5FA",
      dark: "#2563EB",
      contrastText: "#ffffff",
    },
    success: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
      contrastText: "#ffffff",
    },
    text: {
      primary: mode === "light" ? "#1F2937" : "#F9FAFB",
      secondary: mode === "light" ? "#64748B" : "#94A3B8",
      disabled: mode === "light" ? "#9CA3AF" : "#6B7280",
    },
    divider: mode === "light" ? "#E5E7EB" : "#374151",
    background: {
      paper: mode === "light" ? "#ffffff" : "#1F2937",
      default: mode === "light" ? "#F9FAFB" : "#111827",
    },
    action: {
      active:
        mode === "light" ? "rgba(0, 0, 0, 0.54)" : "rgba(255, 255, 255, 0.7)",
      hover:
        mode === "light" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.08)",
      selected:
        mode === "light"
          ? "rgba(99, 102, 241, 0.08)"
          : "rgba(99, 102, 241, 0.16)",
      disabled:
        mode === "light" ? "rgba(0, 0, 0, 0.26)" : "rgba(255, 255, 255, 0.3)",
      disabledBackground:
        mode === "light" ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)",
      focus:
        mode === "light" ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)",
    },
  },
  shadows: [
    "none",
    "0px 1px 2px rgba(0, 0, 0, 0.05)",
    "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
    "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
    "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)",
    "0px 3px 6px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.12)",
    "0px 10px 20px rgba(0, 0, 0, 0.15), 0px 3px 6px rgba(0, 0, 0, 0.1)",
    "0px 15px 25px rgba(0, 0, 0, 0.15), 0px 5px 10px rgba(0, 0, 0, 0.05)",
    "0px 20px 40px rgba(0, 0, 0, 0.2)",
    "0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)",
    "0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2)",
    "0px 3px 3px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 8px rgba(0, 0, 0, 0.2)",
    "0px 4px 4px rgba(0, 0, 0, 0.14), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 1px 10px rgba(0, 0, 0, 0.2)",
    "0px 5px 5px rgba(0, 0, 0, 0.14), 0px 6px 6px rgba(0, 0, 0, 0.12), 0px 1px 14px rgba(0, 0, 0, 0.2)",
    "0px 6px 6px rgba(0, 0, 0, 0.14), 0px 10px 8px rgba(0, 0, 0, 0.12), 0px 3px 14px rgba(0, 0, 0, 0.2)",
    "0px 8px 8px rgba(0, 0, 0, 0.14), 0px 12px 10px rgba(0, 0, 0, 0.12), 0px 4px 18px rgba(0, 0, 0, 0.2)",
    "0px 9px 9px rgba(0, 0, 0, 0.14), 0px 14px 12px rgba(0, 0, 0, 0.12), 0px 5px 22px rgba(0, 0, 0, 0.2)",
    "0px 10px 10px rgba(0, 0, 0, 0.14), 0px 16px 14px rgba(0, 0, 0, 0.12), 0px 6px 26px rgba(0, 0, 0, 0.2)",
    "0px 11px 11px rgba(0, 0, 0, 0.14), 0px 18px 16px rgba(0, 0, 0, 0.12), 0px 7px 30px rgba(0, 0, 0, 0.2)",
    "0px 12px 12px rgba(0, 0, 0, 0.14), 0px 20px 18px rgba(0, 0, 0, 0.12), 0px 8px 34px rgba(0, 0, 0, 0.2)",
    "0px 13px 13px rgba(0, 0, 0, 0.14), 0px 22px 20px rgba(0, 0, 0, 0.12), 0px 9px 38px rgba(0, 0, 0, 0.2)",
  ],
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
      lineHeight: 1.2,
      letterSpacing: "0em",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.2,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.2,
      letterSpacing: "0em",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.2,
      letterSpacing: "0.0075em",
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.5,
      letterSpacing: "0.00714em",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.5,
      letterSpacing: "0.01071em",
    },
    button: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "none",
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
    },
    overline: {
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 2.66,
      letterSpacing: "0.08333em",
      textTransform: "uppercase",
    },
  },
  spacing: 8, // Base spacing unit in px
  shape: {
    borderRadius: 8,
  },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
    fab: 1050,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "8px 16px",
          fontWeight: 500,
        },
        contained: {
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
          "&:hover": {
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&.Mui-selected": {
            backgroundColor: (mode) =>
              mode === "light"
                ? "rgba(99, 102, 241, 0.08)"
                : "rgba(99, 102, 241, 0.16)",
            "&:hover": {
              backgroundColor: (mode) =>
                mode === "light"
                  ? "rgba(99, 102, 241, 0.12)"
                  : "rgba(99, 102, 241, 0.24)",
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
          color: "inherit",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 12px",
          "&.Mui-selected": {
            color: "#6366F1",
            backgroundColor: (mode) =>
              mode === "light"
                ? "rgba(99, 102, 241, 0.08)"
                : "rgba(99, 102, 241, 0.16)",
            "&:hover": {
              backgroundColor: (mode) =>
                mode === "light"
                  ? "rgba(99, 102, 241, 0.12)"
                  : "rgba(99, 102, 241, 0.24)",
            },
            "& .MuiListItemIcon-root": {
              color: "#6366F1",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow:
            "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
        },
      },
    },
  },
});

// Usage:
// import { createTheme } from '@mui/material/styles';
//
// const lightTheme = createTheme(getTheme('light'));
// const darkTheme = createTheme(getTheme('dark'));
//
// export { lightTheme, darkTheme };
