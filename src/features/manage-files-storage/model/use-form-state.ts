import { useState } from "react";

import type { FileFormData } from "../domain/form";

const initialFormData: FileFormData = {
  name: "",
  type: "file",
  size: undefined,
};

export function useFormState(defaultFormState?: FileFormData) {
  const [userFormData, setUserFormData] = useState<FileFormData>({});

  const onChangeFormData = (
    name: keyof FileFormData,
    value: string | number,
  ) => {
    setUserFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fullFormData = {
    ...initialFormData,
    ...defaultFormState,
    ...userFormData,
  };

  const reset = () => {
    setUserFormData({});
  };

  return {
    data: fullFormData,
    onChange: onChangeFormData,
    reset,
  } as const;
}
