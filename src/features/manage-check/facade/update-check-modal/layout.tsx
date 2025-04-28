import { useTransition } from "react";

import type { UpdateData } from "@/kernel/api/accounts";

import { Modal } from "../../ui/modal";
import { UpdateFields } from "../../ui/fields/update-fields";
import { UpdateFormActions } from "../../ui/form-actions/update-form-actions";

import { useErrors } from "../../model/use-errors";
import { useUpdateCheckModal } from "../../model/use-update-check-modal";

import { useFormState } from "../../view-model/use-form-state";

export function Layout({
  updateCheck,
}: {
  updateCheck: (id: string, body: UpdateData) => Promise<void>;
}) {
  const [isLoading, startTransition] = useTransition();
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

  const handleSubmitForm = () => {
    const isValid = errorsState.checkIsValid();

    if (isValid) {
      errorsState.hideErrors();

      startTransition(
        async () =>
          await updateCheck(
            updateCheckModal.currentAccount?.id ?? "",
            formState.data as UpdateData,
          ).finally(onClose),
      );
    } else {
      errorsState.showErrors();
    }
  };

  return (
    <Modal
      title="Редактирование счёта"
      body={
        <UpdateFields
          formData={formState.data}
          errors={errorsState.errors}
          onChange={formState.onChange}
          account={updateCheckModal.currentAccount}
          isLoading={updateCheckModal.isLoading}
        />
      }
      footer={
        <UpdateFormActions
          onReset={formState.reset}
          disabled={isLoading}
          onSubmit={handleSubmitForm}
          onClose={onClose}
        />
      }
      onClose={onClose}
      isOpen={updateCheckModal.isOpen}
    />
  );
}
