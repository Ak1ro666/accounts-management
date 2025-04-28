export const AppRoutes = {
  MAIN: "MAIN",
  ABOUT: "ABOUT",
} as const;

export type AppRoutesType = (typeof AppRoutes)[keyof typeof AppRoutes];

export const ROUTE_PATHS: Record<AppRoutesType, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ABOUT]: "/about",
} as const;
