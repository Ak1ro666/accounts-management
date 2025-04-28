import { useState } from "react";
import type { FormData, FormErrors } from "../domain/form";
import type { Account } from "@/kernel/account";

export function useErrors({
  accountsData,
  formData,
}: {
  accountsData?: Account[];
  formData: FormData;
}) {
  const [isShowErrors, setIsShowErrors] = useState<boolean>(false);

  const validate = (data: FormData) => {
    const errors: FormErrors = {};

    if (!data.code) {
      errors.code = errors.code ?? [];
      errors.code.push("Необходимо заполнить поле 'Код счета'");
    }

    if (accountsData?.some((account) => account.code === data.code)) {
      errors.code = errors.code ?? [];
      errors.code.push("Счет с таким кодом уже существует");
    }

    if (!data.owner) {
      errors.owner = errors.owner ?? [];
      errors.owner.push("Необходимо заполнить поле 'Владелец'");
    }

    if (data.owner && data.owner?.length <= 3) {
      errors.owner = errors.owner ?? [];
      errors.owner.push("Поле 'Владелец' должно содержать более 3-х символов");
    }

    if (!data.address) {
      errors.address = errors.address ?? [];
      errors.address.push("Необходимо заполнить поле 'Адрес'");
    }

    return errors;
  };

  const errors = isShowErrors ? validate(formData) : undefined;

  const checkIsValid = () => {
    const errors = validate(formData);
    return Object.keys(errors).length === 0;
  };

  const getFieldError = (name: keyof FormErrors) => {
    return errors?.[name];
  };

  const hideErrors = () => setIsShowErrors(false);
  const showErrors = () => setIsShowErrors(true);

  return {
    errors,
    checkIsValid,
    getFieldError,
    hideErrors,
    showErrors,
  } as const;
}
