import { ROUTES } from "@/shared/model/routes";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const isAuth = true;

  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}
