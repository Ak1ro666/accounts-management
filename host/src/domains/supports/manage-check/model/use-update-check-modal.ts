import type { Account, AccountId } from '../domain/account'

import { useState } from 'react'

import { ACCOUNTS_CHARGES, ACCOUNTS_PAYMENTS } from '../lib/constants'

import { AccountsApiContext } from '@/domains/contacts/accounts'
import { checkModalEventEmitter } from '@/domains/contacts/check-modal'
import { delay } from '@/platform/lib/react/delay'
import { useMyMemo } from '@/platform/lib/react/memo'

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

  const defaultAccountFormState = useMyMemo(
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
