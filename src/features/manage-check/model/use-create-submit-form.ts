import { useTransition } from "react";

import type { CreateData } from "@/kernel/api/accounts";

export function useCreateSubmitForm({
  createCheck,
  checkIsValid,
  hideErrors,
  showErrors,
  afterSubmit,
  formStateData,
}: {
  createCheck: (body: CreateData) => Promise<void>;
  checkIsValid: () => boolean;
  hideErrors: () => void;
  showErrors: () => void;
  afterSubmit: () => void;
  formStateData: CreateData;
}) {
  const [isLoading, startTransition] = useTransition();

  const onSubmitForm = () => {
    const isValid = checkIsValid();

    if (isValid) {
      hideErrors();
      startTransition(
        async () =>
          await createCheck(formStateData as CreateData).finally(afterSubmit),
      );
    } else {
      showErrors();
    }
  };

  return {
    isLoading,
    onSubmitForm,
  } as const;
}
