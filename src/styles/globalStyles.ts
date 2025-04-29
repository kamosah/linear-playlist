import { createGlobalStyle } from "styled-components";
import { DARK_LINEAR_GRADIENT, LIGHT_LINEAR_GRADIENT } from "./theme";

export const GlobalStyles = createGlobalStyle`
  /* Reset styles previously provided by TailwindCSS */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${({ theme }) =>
      theme.mode === "dark" ? DARK_LINEAR_GRADIENT : LIGHT_LINEAR_GRADIENT};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Inter', sans-serif;
    margin: 0;
    overflow-x: hidden;
    padding: 0;
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;
