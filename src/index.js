import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import { PageProvider } from "./context/PageContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <PageProvider>
      <App />
    </PageProvider>
  </StrictMode>
);
