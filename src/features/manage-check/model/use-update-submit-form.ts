import type { UpdateData } from '@/kernel/api/accounts'
import type { Account, AccountId } from '../domain/account'

import { useTransition } from 'react'

import { AccountsApiContext } from '@/kernel/api/accounts'

import { useConfirmation } from '@/shared/ui/kit/confirmation'

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
  const api = AccountsApiContext.use()
  const confirmation = useConfirmation()
  const [isLoading, startTransition] = useTransition()

  const onSubmitForm = () => {
    const isValid = checkIsValid()

    if (isValid) {
      hideErrors()
      if (!account?.id) return

      startTransition(async () => {
        const currentAccount = await api.fetchAccountsById(account.id)

        if (currentAccount[0].updatedAt !== account.updatedAt) {
          confirmation.open({
            title: 'Внимание',
            content:
              'Данные были изменены другим пользователем. Хотите обновить данные?',
            cancelText: 'Отменить',
            confirmationText: 'Обновить',
            onConfirm: async () => {
              resetForm()
              await onConfirm(account.id)
            }
          })

          return
        }

        await updateCheck(account.id, formStateData).finally(afterSubmitForm)
      })
    } else {
      showErrors()
    }
  }

  return {
    isLoading,
    onSubmitForm
  } as const
}
