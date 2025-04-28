import { useTransition } from "react";
import type { Account } from "@/kernel/account";
import type { CreateData } from "@/kernel/api/accounts";

import { Modal } from "../../ui/modal";
import { CreateFields } from "../../ui/fields/create-fields";
import { CreateFormActions } from "../../ui/form-actions/create-form-actions";

import { useCreateCheck } from "../../model/use-create-check";
import { useErrors } from "../../model/use-errors";

import { useFormState } from "../../view-model/use-form-state";

export function Layout({
  createCheck,
  accountsData,
}: {
  createCheck: (body: CreateData) => Promise<void>;
  accountsData: Account[];
}) {
  const [isLoading, startTransition] = useTransition();
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

  const handleSubmitForm = () => {
    const isValid = errorsState.checkIsValid();

    if (isValid) {
      errorsState.hideErrors();
      startTransition(
        async () =>
          await createCheck(formState.data as CreateData).finally(onClose),
      );
    } else {
      errorsState.showErrors();
    }
  };

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
          disabled={isLoading}
          onSubmit={handleSubmitForm}
          onClose={onClose}
        />
      }
      onClose={onClose}
      isOpen={isCreating}
    />
  );
}
