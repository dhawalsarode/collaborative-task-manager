import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/background.css";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import { ThemeProvider } from "./theme/ThemeContext";
import { Toaster } from "sonner";

import "./index.css";

/* ================= REACT QUERY CLIENT ================= */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

/* ================= RENDER ================= */

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <Toaster
            richColors
            position="top-right"
            closeButton
            duration={3000}
          />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);