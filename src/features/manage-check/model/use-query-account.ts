import { useLoad } from "@/shared/infastructure/use-load";
import type { AccountId } from "../domain/account";
import { AccountsApiContext } from "@/kernel/api/accounts";

export function useQueryAccount(id: AccountId) {
  const api = AccountsApiContext.use();
  return useLoad(() => api.fetchAccountsForId(id));
}
