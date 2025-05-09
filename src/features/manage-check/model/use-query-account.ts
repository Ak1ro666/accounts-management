import { AccountsApiContext } from "@/kernel/api/accounts";

import { useQuery } from "@/shared/infastructure/use-query";

import type { AccountId } from "../domain/account";

export function useQueryAccount(id: AccountId) {
  const api = AccountsApiContext.use();
  return useQuery({
    fetcher: () => api.fetchAccountsById(id),
  });
}
