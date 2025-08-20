import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    lazy: () => import("../pages/sign-in"),
  },
]);
