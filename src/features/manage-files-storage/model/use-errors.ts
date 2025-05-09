import { useState } from "react";

import type { FileFormData, FormErrors } from "../domain/form";

export function useErrors(formData: FileFormData) {
  const [isShowErrors, setIsShowErrors] = useState<boolean>(false);

  const validate = (data: FileFormData) => {
    const errors: FormErrors = {};

    if (!data.name) {
      errors.name = errors.name ?? [];
      errors.name.push("Необходимо заполнить поле 'Название'");
    }

    if (data.type === "file" && !data.size) {
      errors.size = errors.size ?? [];
      errors.size.push("Необходимо заполнить поле 'Размер'");
    }

    return errors;
  };

  const checkIsValid = () => {
    const errors = validate(formData);
    return Object.keys(errors).length === 0;
  };

  const errors = isShowErrors ? validate(formData) : undefined;

  const showErrors = () => setIsShowErrors(true);
  const hideErrors = () => setIsShowErrors(false);

  const getFieldErrors = (name: keyof FormErrors) => {
    return errors?.[name];
  };

  return {
    errors,
    checkIsValid,
    getFieldErrors,
    hideErrors,
    showErrors,
  } as const;
}
