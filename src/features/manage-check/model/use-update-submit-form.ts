import { useTransition } from "react";

import { AccountsApiContext, type UpdateData } from "@/kernel/api/accounts";
import { useConfirmation } from "@/shared/ui/confirmation";

import type { Account, AccountId } from "../domain/account";

export function useUpdateSubmitForm({
  updateCheck,
  account,
  refetchAccount,
  resetForm,
  afterSubmitForm,
  checkIsValid,
  hideErrors,
  showErrors,
  formStateData,
}: {
  updateCheck: (id: AccountId, body: UpdateData) => Promise<void>;
  account?: Account;
  refetchAccount: (id: AccountId) => Promise<void>;
  resetForm: () => void;
  afterSubmitForm: () => void;
  checkIsValid: () => boolean;
  hideErrors: () => void;
  showErrors: () => void;
  formStateData: UpdateData;
}) {
  const api = AccountsApiContext.use();
  const confirmation = useConfirmation();
  const [isLoading, startTransition] = useTransition();

  const onSubmitForm = () => {
    const isValid = checkIsValid();

    if (isValid) {
      hideErrors();

      if (account?.id) {
        startTransition(async () => {
          const currentAccount = await api.fetchAccountsById(account.id);

          if (currentAccount.updatedAt !== account.updatedAt) {
            confirmation.open({
              title: "Внимание",
              content:
                "Данные были изменены другим пользователем. Хотите обновить данные?",
              cancelText: "Отменить",
              confirmationText: "Обновить",
              onConfirm: async () => {
                resetForm();
                await refetchAccount(account.id);
              },
            });

            return;
          }

          await updateCheck(account.id, formStateData).finally(afterSubmitForm);
        });
      }
    } else {
      showErrors();
    }
  };

  return {
    isLoading,
    onSubmitForm,
  } as const;
}
