import type { Account } from "@/kernel/account";
import type { CreateData } from "@/kernel/api/accounts";

import { Modal } from "../../ui/modal";
import { CreateFields } from "../../ui/fields/create-fields";
import { CreateFormActions } from "../../ui/form-actions/create-form-actions";

import { useCreateCheck } from "../../model/use-create-check";
import { useErrors } from "../../model/use-errors";

import { useFormState } from "../../view-model/use-form-state";
import { useCreateSubmitForm } from "../../model/use-create-submit-form";

export function Layout({
  createCheck,
  accountsData,
}: {
  createCheck: (body: CreateData) => Promise<void>;
  accountsData: Account[];
}) {
  const cancelCreate = useCreateCheck((state) => state.cancelCreate);
  const isCreating = useCreateCheck((state) => state.isCreating);
  const formState = useFormState();
  const errorsState = useErrors({
    formData: formState.data,
    accountsData,
  });
  const onClose = () => {
    cancelCreate();
    formState.reset();
    errorsState.hideErrors();
  };
  const formSubmit = useCreateSubmitForm({
    createCheck,
    checkIsValid: errorsState.checkIsValid,
    hideErrors: errorsState.hideErrors,
    showErrors: errorsState.showErrors,
    afterSubmit: onClose,
    formStateData: formState.data,
  });

  return (
    <Modal
      title="Создание счета"
      body={
        <CreateFields
          formData={formState.data}
          errors={errorsState.errors}
          onChange={formState.onChange}
        />
      }
      footer={
        <CreateFormActions
          disabled={formSubmit.isLoading}
          onSubmit={formSubmit.onSubmitForm}
          onClose={onClose}
        />
      }
      onClose={onClose}
      isOpen={isCreating}
    />
  );
}
