import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppErrorBoundary } from "./components/layout/AppErrorBoundary";
import { NotificationsProvider } from "./contexts/NotificationsContext";
import { router } from "./router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <NotificationsProvider>
        <RouterProvider router={router} />
      </NotificationsProvider>
    </AppErrorBoundary>
  </React.StrictMode>
);
