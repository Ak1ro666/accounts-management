import { type FormEvent, useTransition } from "react";

import type { FileFormData } from "../domain/form";

export function useSubmitForm({
  checkIsValid,
  hideErrors,
  showErrors,
  reset,
  onSubmit,
  formState,
}: {
  checkIsValid: () => boolean;
  hideErrors: () => void;
  showErrors: () => void;
  reset: () => void;
  onSubmit: (data: FileFormData) => void;
  formState: FileFormData;
}) {
  const [isLoading, startTransition] = useTransition();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isValid = checkIsValid();

    if (isValid) {
      hideErrors();

      startTransition(() => {
        onSubmit(formState);
        reset();
      });
    } else {
      showErrors();
    }
  };

  return {
    isLoading,
    handleSubmit,
  } as const;
}
