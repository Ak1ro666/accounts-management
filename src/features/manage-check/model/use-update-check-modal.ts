import type { Account, AccountId } from '../domain/account'

import { useMemo, useState } from 'react'

import { AccountsApiContext } from '@/kernel/api/accounts'
import { checkModalEventEmitter } from '@/kernel/check-modal'

import { delay } from '@/shared/lib/react/delay'

import { ACCOUNTS_CHARGES, ACCOUNTS_PAYMENTS } from '../lib/constants'

export function useUpdateCheckModal() {
  const api = AccountsApiContext.use()
  const [account, setAccount] = useState<Account>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchAccount = async (id: AccountId) => {
    setIsLoading(true)
    delay(1000).then(() =>
      Promise.all([
        api.fetchAccountsById(id),
        Promise.resolve(ACCOUNTS_CHARGES), // api.fetchAccountsCharges(id),
        Promise.resolve(ACCOUNTS_PAYMENTS) // api.fetchAccountsPayments(id),
      ])
        .then(([accountData, chargesData, paymentsData]) =>
          setAccount({
            ...accountData[0],
            charges: chargesData,
            payments: paymentsData
          })
        )
        .finally(() => setIsLoading(false))
    )
  }

  checkModalEventEmitter.useEvent('onChangeOpenModal', async (id) => {
    setIsOpen(true)
    await fetchAccount(id)
  })

  const closeModal = () => {
    setIsOpen(false)
    setAccount(undefined)
  }

  const defaultAccountFormState = useMemo(
    () => ({
      address: account?.address,
      code: account?.code,
      status: account?.status,
      owner: account?.owner
    }),
    [account]
  )

  return {
    isOpen,
    account,
    closeModal,
    refetch: fetchAccount,
    isLoading,
    defaultAccountFormState
  } as const
}
