import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: linear-gradient(to bottom, oklch(25% 0.035 261.692), oklch(13% 0.028 261.692));
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Inter', sans-serif;
    margin: 0;
    overflow-x: hidden;
    padding: 0;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;
