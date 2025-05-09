import { type UpdateData } from "@/kernel/api/accounts";

import { AccountTabs } from "../../ui/account-tabs";
import { UpdateFields } from "../../ui/fields/update-fields";
import { UpdateFormActions } from "../../ui/form-actions/update-form-actions";

import { useErrors } from "../../model/use-errors";
import { useUpdateCheckModal } from "../../model/use-update-check-modal";
import { useUpdateSubmitForm } from "../../model/use-update-submit-form";

import { useFormState } from "../../view-model/use-form-state";

import type { AccountId } from "../../domain/account";
import { UiModal } from "@/shared/ui/modal";

export function Layout({
  updateCheck,
  openFilesStorage,
}: {
  updateCheck: (id: AccountId, body: UpdateData) => Promise<void>;
  openFilesStorage: () => void;
}) {
  const updateCheckModal = useUpdateCheckModal();
  const formState = useFormState(updateCheckModal.defaultAccountFormState);
  const errorsState = useErrors({
    formData: formState.data,
  });
  const onClose = () => {
    updateCheckModal.closeModal();
    formState.reset();
    errorsState.hideErrors();
  };
  const formSubmit = useUpdateSubmitForm({
    account: updateCheckModal.account,
    refetchAccount: updateCheckModal.refetch,
    resetForm: formState.reset,
    afterSubmitForm: onClose,
    checkIsValid: errorsState.checkIsValid,
    hideErrors: errorsState.hideErrors,
    showErrors: errorsState.showErrors,
    formStateData: formState.data,
    updateCheck,
  });

  return (
    <>
      <UiModal
        title="Редактирование счёта"
        body={
          <UpdateFields
            formData={formState.data}
            errors={errorsState.errors}
            onChange={formState.onChange}
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
            onReset={formState.reset}
            disabled={formSubmit.isLoading}
            onSubmit={formSubmit.onSubmitForm}
            onClose={onClose}
            isUpdateFormData={formState.isUpdate}
          />
        }
        onClose={onClose}
        open={updateCheckModal.isOpen}
        fullWidth
      />
    </>
  );
}
