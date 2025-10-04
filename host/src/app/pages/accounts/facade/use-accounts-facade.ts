import {
  useDeleteAccounts,
  useOptimisticDeleteAccounts
} from '../model/delete-accounts'
import { useAccountsPermissions } from '../model/permissions'
import { useAccountsApi } from '../model/use-accounts-api'

import { accountsApiContext } from '@/domains/contacts/accounts'

export function useAccountsFacade() {
  const accountsApi = accountsApiContext.use()
  const accounts = useAccountsApi(accountsApi)
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
