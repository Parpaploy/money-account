import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/router.tsx";
import { MiddlewareInit } from "./middleware/index.ts";

(async () => {
  await MiddlewareInit();
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
})();
