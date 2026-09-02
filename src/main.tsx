import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { AppProvider } from "./context/AppContext";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <App />
    <Toaster position="top-center" richColors />
  </AppProvider>
);