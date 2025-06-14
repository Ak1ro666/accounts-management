import { useState } from "react";
import type { FormData } from "../domain/form";

const initialFormData: FormData = {
  address: "",
  code: "",
  owner: "",
  status: "OPEN",
};

export function useFormState(defaultFormData?: FormData) {
  const [formData, setFormData] = useState<FormData>({});

  const onChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setFormData({});
  };

  const fullFormData = { ...initialFormData, ...defaultFormData, ...formData };

  const isUpdated = Object.values(formData).length > 0;

  return {
    data: fullFormData,
    onChange,
    reset,
    isUpdated,
  } as const;
}
