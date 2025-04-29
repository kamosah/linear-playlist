import "styled-components";

// Import your theme type
// (Replace this path with the actual path to your theme file)
import { ThemeType } from "../styles/theme";

// Extend the DefaultTheme interface with your theme properties
declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {
    colors: {
      active: string;
      border: string;
      badge: string;
      bg: string;
      hover: string;
      muted: string;
      secondary: string;
      surface: string;
      text: string;
      caption: string;
    };
    radii: {
      xl: string;
    };
    spacing: {
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
    border: {
      lg: string;
      md: string;
      sm: string;
    };
    mode: "light" | "dark";
  }
}
