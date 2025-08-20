import type { Account, AccountId } from '@/kernel/account'

import { create } from 'zustand'

export function useDeleteAccounts({
  afterComplete,
  onComplete,
  removeAccount
}: {
  onComplete: () => Promise<void>
  afterComplete?: () => void
  removeAccount: (id: AccountId) => Promise<void>
}) {
  const setDeletingAccounts = useDeleteStore(
    (state) => state.setDeletingAccounts
  )
  const deletingAccounts = useDeleteStore((state) => state.deletingAccounts)

  return async (id: AccountId) => {
    setDeletingAccounts([...deletingAccounts, id])

    await removeAccount(id)
      .then(onComplete)
      .finally(() => {
        setDeletingAccounts([])
        afterComplete?.()
      })
  }
}

export function useOptimisticDeleteAccounts(accounts: Account[]) {
  const deletingAccounts = useDeleteStore((state) => state.deletingAccounts)

  const filterAccount = (account: Account) =>
    !deletingAccounts.includes(account.id)

  return deletingAccounts.length > 0 ? accounts.filter(filterAccount) : accounts
}

type Store = {
  deletingAccounts: AccountId[]
  setDeletingAccounts: (deletingAccounts: AccountId[]) => void
}

export const useDeleteStore = create<Store>((set) => ({
  deletingAccounts: [],
  setDeletingAccounts: (deletingAccounts) => set({ deletingAccounts })
}))
