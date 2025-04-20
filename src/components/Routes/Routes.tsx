import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./Home";
import { Playlist } from "./Playlist";

// Error Boundary Component for handling errors
const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <p>{error.message}</p>
    </div>
  );
};

// Create the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorBoundary error={new Error("Home Route Error")} />, // Error handling for the Home route
  },
  {
    path: "/playlist/:id",
    element: <Playlist />,
    // TODO: Fix Error Boundary
    errorElement: <ErrorBoundary error={new Error("Playlist Route Error")} />, // Error handling for the Playlist route
  },
  {
    path: "*", // Catch-all route for automatic redirects (404 handling)
    element: <div>Page Not Found. Redirecting...</div>, // Custom 404 Page
    loader: () => {
      window.location.href = "/"; // Redirect to home automatically
      return null;
    },
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
