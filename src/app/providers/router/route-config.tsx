import { RouteProps } from "react-router-dom";

import { AppRoutes, AppRoutesType, ROUTE_PATHS } from "@/kernel/routes";

import { AboutPage } from "@/pages/about";
import { MainPage } from "@/pages/main";

export const routeConfig: Record<AppRoutesType, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: ROUTE_PATHS.MAIN,
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: ROUTE_PATHS.ABOUT,
    element: <AboutPage />,
  },
};
