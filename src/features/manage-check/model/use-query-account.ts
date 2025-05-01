import { AccountsApiContext } from "@/kernel/api/accounts";

import { useLoad } from "@/shared/infastructure/use-load";

import type { AccountId } from "../domain/account";

export function useQueryAccount(id: AccountId) {
  const api = AccountsApiContext.use();
  return useLoad({
    fetcher: () => api.fetchAccountsForId(id),
  });
}
