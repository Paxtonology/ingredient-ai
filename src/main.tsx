import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { ScanHistoryProvider } from '@/contexts/ScanHistoryContext';

// Initialize Speed Insights first
injectSpeedInsights();

createRoot(document.getElementById("root")!).render(
  <ScanHistoryProvider>
    <App />
  </ScanHistoryProvider>
);