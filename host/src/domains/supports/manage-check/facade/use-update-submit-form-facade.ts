import type { UpdateData } from '@/kernel(platform)/api/accounts'
import type { Account, AccountId } from '../domain/account'
import type { FormData } from '../domain/form'

import { useErrors } from '../model/use-errors'
import { useUpdateSubmitForm } from '../model/use-update-submit-form'
import { useFormState } from '../view-model/use-form-state'

export function useUpdateSubmitFormFacade({
  updateCheck,
  defaultAccountFormState,
  closeUpdateCheckModal,
  account,
  refetchAccount
}: {
  updateCheck: (id: AccountId, body: UpdateData) => Promise<void>
  defaultAccountFormState: FormData
  closeUpdateCheckModal: () => void
  account?: Account
  refetchAccount: (id: AccountId) => Promise<void>
}) {
  const formState = useFormState(defaultAccountFormState)
  const errorsState = useErrors({
    formData: formState.data
  })
  const onClose = () => {
    closeUpdateCheckModal()
    formState.reset()
    errorsState.hideErrors()
  }
  const formSubmit = useUpdateSubmitForm({
    account: account,
    onConfirm: refetchAccount,
    resetForm: formState.reset,
    afterSubmitForm: onClose,
    checkIsValid: errorsState.checkIsValid,
    hideErrors: errorsState.hideErrors,
    showErrors: errorsState.showErrors,
    formStateData: formState.data,
    updateCheck
  })

  return {
    formSubmit,
    formState: formState.data,
    errors: errorsState.data,
    onChangeFormState: formState.onChange,
    isLoading: formSubmit.isLoading,
    onSubmit: formSubmit.onSubmitForm,
    reset: formState.reset,
    isUpdated: formState.isUpdated,
    onCloseUpdateCheckModal: onClose
  }
}
