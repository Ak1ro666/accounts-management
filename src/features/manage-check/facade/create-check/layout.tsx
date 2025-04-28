import { Modal } from "../../ui/modal";
import { FormActions } from "../../ui/form-actions/update-form-actions";
import { useCreateCheck } from "../../model/use-create-check";
import { useFormState } from "../../view-model/use-form-state";
import { useErrors } from "../../model/use-errors";
import type { CreateData } from "@/kernel/api/accounts/types";
import { DefaultFields } from "../../ui/fields/create-fields";
import { Account } from "@/kernel/account";
import { useTransition } from "react";

export function Layout({
  onCreateCheck,
  accountsData,
}: {
  onCreateCheck: (body: CreateData) => Promise<void>;
  accountsData: Account[];
}) {
  const [isLoading, startTransition] = useTransition();
  const createCheck = useCreateCheck();
  const formState = useFormState();
  const errorsState = useErrors({
    formData: formState.data,
    accountsData,
  });
  const onClose = () => {
    createCheck.cancelCreate();
    formState.reset();
    errorsState.hideErrors();
  };

  const handleSubmitForm = () => {
    const isValid = errorsState.checkIsValid();

    if (isValid) {
      errorsState.hideErrors();
      startTransition(
        async () =>
          await onCreateCheck(formState.data as CreateData).finally(onClose),
      );
    } else {
      errorsState.showErrors();
    }
  };

  return (
    <Modal
      title="Создание счета"
      body={
        <DefaultFields
          formData={formState.data}
          errors={errorsState.errors}
          onChange={formState.onChangeFormData}
        />
      }
      footer={
        <FormActions
          disabled={isLoading}
          onSubmit={handleSubmitForm}
          onClose={onClose}
        />
      }
      onClose={onClose}
      isOpen={createCheck.isCreating}
    />
  );
}
