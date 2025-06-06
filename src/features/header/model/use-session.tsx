import { appSessionStore } from "@/shared/model/session";

export function useSession() {
  return appSessionStore.useSession();
}
