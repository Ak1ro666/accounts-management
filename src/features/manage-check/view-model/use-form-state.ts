import { useState } from "react";
import type { FormData } from "../domain/form";

export function useFormState(defaultFormData?: FormData) {
  const [formData, setFormData] = useState<FormData>({});

  const onChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setFormData({});
  };

  const fullFormData = { ...defaultFormData, ...formData };

  const isUpdateFormData = Object.values(formData).length > 0;

  return {
    data: fullFormData,
    onChange,
    reset,
    isUpdate: isUpdateFormData,
  } as const;
}
