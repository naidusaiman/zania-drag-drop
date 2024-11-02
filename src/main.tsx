import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// @ts-expect-error: Suppressing TypeScript error due to missing type definitions for the worker module
import { worker } from "./mocks/browser";

import App from "./App.tsx";

// worker.start();

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

// Start the worker
worker.start().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});

