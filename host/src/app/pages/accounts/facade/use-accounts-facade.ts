import {
  useDeleteAccounts,
  useOptimisticDeleteAccounts
} from '../model/delete-accounts'
import { useAccountsPermissions } from '../model/permissions'
import { useAccounts } from '../model/use-accounts'

import { AccountsApiContext } from '@/domains/contacts/accounts'

export function useAccountsFacade() {
  const accountsApi = AccountsApiContext.use()
  const accounts = useAccounts(accountsApi)
  const optimisticAccountsDelete = useOptimisticDeleteAccounts(accounts.data)
  const permissions = useAccountsPermissions()
  const deleteAccount = useDeleteAccounts({
    onComplete: accounts.refetch,
    removeAccount: (id) => accountsApi.remove(id)
  })

  return {
    data: optimisticAccountsDelete,
    update: accounts.update,
    create: accounts.create,
    remove: deleteAccount,
    isLoading: accounts.isLoading,
    permissions
  }
}
