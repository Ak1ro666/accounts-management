import { appSessionStore } from "@/shared/model/session";
import { ROUTES } from "@/shared/model/routes";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const session = appSessionStore.getSession();

  if (!session) {
    return <Navigate to={ROUTES.SIGN_IN} />;
  }

  return <Outlet />;
}
