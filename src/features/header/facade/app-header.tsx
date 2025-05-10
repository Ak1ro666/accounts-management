import { CONFIG } from "@/shared/model/config";

export function AppHeader() {
  return <header>header {CONFIG.API_BASE_URL}</header>;
}
