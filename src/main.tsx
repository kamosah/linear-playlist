import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";

import "./index.css";
import App from "./App.tsx";
import { DARK_THEME } from "./styles";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={DARK_THEME}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
