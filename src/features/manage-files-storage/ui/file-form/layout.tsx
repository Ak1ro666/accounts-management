import { Box, Button, MenuItem, TextField } from "@mui/material";

import type { FileFormData } from "../../domain/form";
import { useErrors } from "../../model/use-errors";
import { useFormState } from "../../model/use-form-state";
import { useSubmitForm } from "../../view-model/use-submit-form";

export function Layout({
  onSubmit,
}: {
  onSubmit: (data: FileFormData) => void;
}) {
  const formState = useFormState();
  const errorsState = useErrors(formState.data);
  const submitForm = useSubmitForm({
    checkIsValid: errorsState.checkIsValid,
    hideErrors: errorsState.hideErrors,
    showErrors: errorsState.showErrors,
    reset: formState.reset,
    onSubmit,
    formState: formState.data,
  });

  return (
    <Box
      component="form"
      onSubmit={submitForm.handleSubmit}
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <TextField
        size="small"
        value={formState.data.name}
        onChange={(e) => formState.onChange("name", e.target.value)}
        placeholder={"placeholder"}
        sx={{ flexGrow: 1 }}
        error={!!errorsState.getFieldErrors("name")}
        helperText={errorsState.getFieldErrors("name")}
      />

      <TextField
        select
        size="small"
        value={formState.data.type}
        onChange={(e) =>
          formState.onChange("type", e.target.value as "file" | "folder")
        }
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="file">Файл</MenuItem>
        <MenuItem value="folder">Папка</MenuItem>
      </TextField>

      {formState.data.type === "file" && (
        <TextField
          type="number"
          size="small"
          value={formState.data.size}
          onChange={(e) => formState.onChange("size", Number(e.target.value))}
          placeholder="Size in bytes"
          sx={{ minWidth: 120 }}
          error={!!errorsState.getFieldErrors("size")}
          helperText={errorsState.getFieldErrors("size")}
        />
      )}

      <Button variant="contained" type="submit">
        Создать
      </Button>
    </Box>
  );
}
