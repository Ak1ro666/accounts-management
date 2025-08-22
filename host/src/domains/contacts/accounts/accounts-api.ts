import type { AccountsApiContextType } from './accounts-api-provider'
import type {
  Account,
  AccountId,
  Charge,
  CreateData,
  Payment,
  UpdateData
} from './types'

import { API_URL } from '@/platform/api/api-config'
import { authorizedApiClient } from '@/platform/api/client'
import { href } from '@/platform/routes'

export const api: AccountsApiContextType = {
  fetchAccounts: async () => {
    return await authorizedApiClient<Account[]>({
      url: API_URL.ACCOUNTS
    })
  },

  create: async (data: CreateData) => {
    return await authorizedApiClient<Account>({
      url: API_URL.ACCOUNTS,
      method: 'POST',
      json: data
    })
  },

  update: async (id: AccountId, data: UpdateData) => {
    return await authorizedApiClient<Account>({
      url: href(API_URL.ACCOUNTS_FOR_ID, { accountId: id }),
      method: 'PUT',
      json: data
    })
  },

  remove: async (id: AccountId) => {
    await authorizedApiClient({
      url: href(API_URL.ACCOUNTS_FOR_ID, { accountId: id }),
      method: 'DELETE'
    })
  },

  fetchAccountsById: async (id: AccountId) => {
    return await authorizedApiClient<Account[]>({
      url: `/accounts?id=${id}`
    })
  },
  fetchAccountsCharges: async (id: AccountId) => {
    return await authorizedApiClient<Charge[]>({
      url: href(API_URL.ACCOUNTS_CHARGES, { id })
    })
  },

  fetchAccountsPayments: async (id: AccountId) => {
    return await authorizedApiClient<Payment[]>({
      url: href(API_URL.ACCOUNTS_PAYMENTS, { id })
    })
  }
}
