import type { AccountId } from '../domain/account'

import { AccountsApiContext } from '@/kernel/api/accounts'

import { useQuery } from '@/shared/lib/react/use-query'

export function useQueryAccount(id: AccountId) {
  const api = AccountsApiContext.use()
  return useQuery({
    fetcher: () => api.fetchAccountsById(id)
  })
}
