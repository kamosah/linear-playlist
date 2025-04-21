import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Layout, Playlist } from "./components/Routes";
import { AudioPlayerProvider, PlaylistContextProvider } from "./context";

// Create the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout route with Sidebar and Main Content
    children: [
      {
        index: true, // Default route for the home page
        element: <Home />,
      },
      {
        path: "playlist/:id",
        element: <Playlist />,
      },
    ],
  },
]);

export const App = () => {
  return (
    <AudioPlayerProvider>
      <PlaylistContextProvider>
        <RouterProvider router={router} />
      </PlaylistContextProvider>
    </AudioPlayerProvider>
  );
};

export default App;
