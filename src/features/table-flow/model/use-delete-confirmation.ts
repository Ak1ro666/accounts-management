import type { AccountId } from "@/kernel/account";

import { useConfirmation } from "@/shared/ui/confirmation";

export function useDeleteConfirmation(
  remove: (id: AccountId) => Promise<void>,
) {
  const confirmation = useConfirmation();

  const onDeleteConfirmation = async (id: AccountId) => {
    const result1 = await confirmation.openAsync({
      title: "Удаление лицевого счета",
      content: "Вы уверены, что хотите удалить этот лицевой счет?",
      confirmationText: "Удалить",
      cancelText: "Отмена",
    });

    if (result1.type === "cancel") {
      return;
    }

    await confirmation.openAsync({
      title: "Подтверждение удаления лицевого счета",
      content: "Это действие нельзя отменить. Вы точно в этом уверены?",
      confirmationText: "Удалить",
      cancelText: "Отмена",
      onConfirm: () => remove(id),
    });
  };

  return onDeleteConfirmation;
}
