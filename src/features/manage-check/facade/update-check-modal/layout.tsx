import { useTransition } from "react";

import { AccountsApiContext, type UpdateData } from "@/kernel/api/accounts";

import { Modal } from "../../ui/modal";
import { UpdateFields } from "../../ui/fields/update-fields";
import { UpdateFormActions } from "../../ui/form-actions/update-form-actions";

import { useErrors } from "../../model/use-errors";
import { useUpdateCheckModal } from "../../model/use-update-check-modal";

import { useFormState } from "../../view-model/use-form-state";
import { AccountTabs } from "../../ui/account-tabs";
import { useConfirmation } from "@/shared/ui/confirmation";
import type { AccountId } from "../../domain/account";

export function Layout({
  updateCheck,
}: {
  updateCheck: (id: AccountId, body: UpdateData) => Promise<void>;
}) {
  const [isLoading, startTransition] = useTransition();
  const api = AccountsApiContext.use();
  const updateCheckModal = useUpdateCheckModal();
  const formState = useFormState(updateCheckModal.defaultAccountFormState);
  const errorsState = useErrors({
    formData: formState.data,
  });
  const confirmation = useConfirmation();

  const onClose = () => {
    updateCheckModal.closeModal();
    formState.reset();
    errorsState.hideErrors();
  };

  const handleSubmitForm = () => {
    const isValid = errorsState.checkIsValid();

    if (isValid) {
      errorsState.hideErrors();

      if (updateCheckModal?.account?.id) {
        startTransition(async () => {
          const currentAccount = await api.fetchAccountsForId(
            updateCheckModal.account!.id,
          );

          if (
            currentAccount.updatedAt !== updateCheckModal.account!.updatedAt
          ) {
            confirmation.open({
              title: "Внимание",
              content:
                "Данные были изменены другим пользователем. Хотите обновить данные?",
              cancelText: "Отменить",
              confirmationText: "Обновить",
              onConfirm: async () => {
                formState.reset();
                await updateCheckModal.refetch(updateCheckModal.account!.id);
              },
            });

            return;
          }

          await updateCheck(
            updateCheckModal.account!.id,
            formState.data as UpdateData,
          ).finally(onClose);
        });
      }
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
          account={updateCheckModal.account}
          isLoading={updateCheckModal.isLoading}
          tabs={
            <AccountTabs
              isLoading={updateCheckModal.isLoading}
              account={updateCheckModal.account}
            />
          }
        />
      }
      footer={
        <UpdateFormActions
          onReset={formState.reset}
          disabled={isLoading}
          onSubmit={handleSubmitForm}
          onClose={onClose}
          isUpdateFormData={formState.isUpdate}
        />
      }
      onClose={onClose}
      isOpen={updateCheckModal.isOpen}
    />
  );
}
