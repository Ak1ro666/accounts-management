import type { CreateData, UpdateData } from '@/kernel/api/accounts'
import type { Account, AccountId } from '../domain/account'

import { useQuery } from '@/shared/lib/react/use-query'

import { API_CONFIG } from '../lib/constants'

export type AccountsApi = {
  fetchAccounts: (slug?: string) => Promise<Account[]>
  create: (data: CreateData) => Promise<Account>
  update: (id: AccountId, data: UpdateData) => Promise<Account>
}

export function useAccounts(api: AccountsApi) {
  const {
    data = [],
    isLoading,
    refetch
  } = useQuery<Account[]>({
    fetcher: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(api.fetchAccounts())
        }, API_CONFIG.mockDelay)
      }),
    options: {
      refetchInterval: API_CONFIG.refetchInterval
    }
  })

  const update = async (id: AccountId, data: UpdateData) => {
    await api
      .update(id, { ...data, updatedAt: new Date().toISOString() })
      .then(refetch)
  }

  const create = async (body: CreateData) => {
    await api.create(body).then(refetch)
  }

  return {
    data,
    refetch,
    update,
    create,
    isLoading
  } as const
}
