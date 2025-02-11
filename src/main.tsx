import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { replace } from "react-router";

const root = createRoot(document.getElementById("root")!);
const path = (/#!(\/?.*)$/.exec(location.hash) || [])[1];
if (path) replace(path);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
