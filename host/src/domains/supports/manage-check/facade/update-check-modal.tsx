import type { AccountId } from '../domain/account'

import { useUpdateCheckModal } from '../model/use-update-check-modal'
import { AccountTabs } from '../ui/account-tabs'
import { UpdateFields } from '../ui/fields/update-fields'
import { UpdateFormActions } from '../ui/form-actions/update-form-actions'
import { useUpdateSubmitFormFacade } from './use-update-submit-form-facade'

import { type UpdateData } from '@/domains/contacts/accounts'
import { UiModal } from '@/platform/ui/modal'

export function UpdateCheckModal({
  updateCheck,
  openFilesStorage
}: {
  updateCheck: (id: AccountId, body: UpdateData) => Promise<void>
  openFilesStorage: () => void
}) {
  const updateCheckModal = useUpdateCheckModal()
  const updateSubmitFormFacade = useUpdateSubmitFormFacade({
    account: updateCheckModal.account,
    refetchAccount: updateCheckModal.refetch,
    closeUpdateCheckModal: updateCheckModal.closeModal,
    defaultAccountFormState: updateCheckModal.defaultAccountFormState,
    updateCheck
  })

  return (
    <UiModal
      title='Редактирование счёта'
      body={
        <UpdateFields
          formData={updateSubmitFormFacade.formState}
          errors={updateSubmitFormFacade.errors}
          onChange={updateSubmitFormFacade.onChangeFormState}
          account={updateCheckModal.account}
          isLoading={updateCheckModal.isLoading}
          tabs={
            <AccountTabs
              openFileStorage={openFilesStorage}
              isLoading={updateCheckModal.isLoading}
              account={updateCheckModal.account}
            />
          }
        />
      }
      actions={
        <UpdateFormActions
          onReset={updateSubmitFormFacade.reset}
          disabled={updateSubmitFormFacade.isLoading}
          onSubmit={updateSubmitFormFacade.onSubmit}
          onClose={updateSubmitFormFacade.onCloseUpdateCheckModal}
          isUpdateFormData={updateSubmitFormFacade.isUpdated}
        />
      }
      onClose={updateSubmitFormFacade.onCloseUpdateCheckModal}
      open={updateCheckModal.isOpen}
      fullWidth
    />
  )
}
