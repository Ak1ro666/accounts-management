import { ROUTES } from "@/shared/model/routes";
import { appSessionStore } from "@/shared/model/session";
import { redirect } from "react-router-dom";

export function authLoader() {
  const token = appSessionStore.getSessionToken();

  if (token) {
    return redirect(ROUTES.ACCOUNTS);
  }

  return null;
}
