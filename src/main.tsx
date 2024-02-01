import React from "react";
import "./index.css";
import App from "app/App";
import { createRoot } from "react-dom/client";
import { enablePatches } from "immer";

enablePatches();
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
