import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Layout, Playlist } from "./components/Routes";

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
  return <RouterProvider router={router} />;
};

export default App;
