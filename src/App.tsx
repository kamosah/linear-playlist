import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Layout, Playlist } from "./components/Routes";
import { AudioPlayerProvider, PlaylistContextProvider } from "./context";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { DARK_THEME, LIGHT_THEME } from "./styles/theme";
import { GlobalStyles } from "./styles";

// Create the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout route with Sidebar and Main Content and Player
    children: [
      {
        index: true, // Default route for the home page
        element: <Home />,
      },
      {
        path: "playlist/:id", // Playlist ID
        element: <Playlist />,
      },
    ],
  },
]);

export const App = () => {
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? DARK_THEME
      : LIGHT_THEME
  );

  // Set theme based on system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setTheme(mediaQuery.matches ? DARK_THEME : LIGHT_THEME);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AudioPlayerProvider>
        <PlaylistContextProvider>
          <GlobalStyles />
          <RouterProvider router={router} />
        </PlaylistContextProvider>
      </AudioPlayerProvider>
    </ThemeProvider>
  );
};

export default App;
