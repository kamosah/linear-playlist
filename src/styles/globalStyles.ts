import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /* Reset styles previously provided by TailwindCSS */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: linear-gradient(to bottom, oklch(25% 0.035 261.692), oklch(13% 0.028 261.692));
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
