import type { UpdateData } from '@/domains/contacts/accounts'
import type { Account, AccountId } from '../domain/account'

import { useTransition } from 'react'

import { CONFIRMATION_MODAL_TEXT } from '../lib/constants'

import { accountsApiContext } from '@/domains/contacts/accounts'
import { useConfirmation } from '@/platform/ui/confirmation'

export function useUpdateSubmitForm({
  updateCheck,
  account,
  onConfirm,
  resetForm,
  afterSubmitForm,
  checkIsValid,
  hideErrors,
  showErrors,
  formStateData
}: {
  updateCheck: (id: AccountId, body: UpdateData) => Promise<void>
  account?: Account
  onConfirm: (id: AccountId) => Promise<void>
  resetForm: () => void
  afterSubmitForm: () => void
  checkIsValid: () => boolean
  hideErrors: () => void
  showErrors: () => void
  formStateData: UpdateData
}) {
  const api = accountsApiContext.use()
  const confirmation = useConfirmation()
  const [isLoading, startTransition] = useTransition()

  const onConfirmUpdate = async (accountId: AccountId) => {
    resetForm()
    await onConfirm(accountId)
  }

  const onValidSubmit = async () => {
    if (!account?.id) return

    const currentAccount = await api.fetchAccountsById(account.id)

    if (currentAccount[0].updatedAt !== account.updatedAt) {
      confirmation.open({
        ...CONFIRMATION_MODAL_TEXT,
        onConfirm: () => onConfirmUpdate(account.id)
      })
      return
    }

    await updateCheck(account.id, formStateData).finally(afterSubmitForm)
  }

  const onSubmitForm = () => {
    const isValid = checkIsValid()

    if (!isValid) {
      showErrors()
      return
    }

    hideErrors()
    startTransition(onValidSubmit)
  }

  return {
    isLoading,
    onSubmitForm
  } as const
}
