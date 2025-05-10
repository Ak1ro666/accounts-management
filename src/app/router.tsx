import { createBrowserRouter, redirect } from "react-router-dom";

import { AppHeader } from "@/features/header";

import { ROUTES } from "@/shared/model/routes";

import { Providers } from "./providers";
import { App } from "./app";

import { ProtectedRoute } from "./model/protected-router";
import { protectedLoader } from "./model/protected-loader";

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        loader: protectedLoader,
        element: (
          <>
            <AppHeader />
            <ProtectedRoute />
          </>
        ),
        children: [
          {
            path: ROUTES.ACCOUNTS,
            lazy: () => import("@/pages/accounts/page"),
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/pages/auth/login.page"),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("@/pages/auth/register.page"),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.ACCOUNTS),
      },
    ],
  },
]);
