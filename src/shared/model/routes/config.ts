export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  ACCOUNTS: "/accounts",
  ACCOUNT: "/account/:id",
  LOGIN: "/login",
  REGISTER: "/register",
} as const;

export type PathParams = {
  [ROUTES.ACCOUNT]: {
    id: string;
  };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
