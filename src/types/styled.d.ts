// Import styled-components default theme interface
import "styled-components";

// Import your theme type
// (Replace this path with the actual path to your theme file)
import { ThemeType } from "../styles/theme";

// Extend the DefaultTheme interface with your theme properties
declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
