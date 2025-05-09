import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import type { FormData, FormErrors } from "../../../domain/form";

export function Layout({
  formData,
  errors,
  onChange,
}: {
  formData: FormData;
  errors?: FormErrors;
  onChange: (name: string) => (value: string) => void;
}) {
  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name)(e.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }} mt={1}>
        <TextField
          name="code"
          label="Код счета"
          value={formData.code}
          onChange={onChangeField}
          fullWidth
          required
          error={!!errors?.code}
          helperText={errors?.code}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }} mt={1}>
        <FormControl fullWidth>
          <InputLabel>Статус</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={(e) => onChange(e.target.name)(e.target.value)}
            label="Статус"
          >
            <MenuItem value="OPEN">Открыт</MenuItem>
            <MenuItem value="PRE_CLOSED">Предзакрыт</MenuItem>
            <MenuItem value="CLOSED">Закрыт</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          name="owner"
          label="Владелец"
          value={formData.owner}
          onChange={onChangeField}
          fullWidth
          required
          error={!!errors?.owner}
          helperText={errors?.owner}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          name="address"
          label="Адрес"
          value={formData.address}
          onChange={onChangeField}
          fullWidth
          required
          error={!!errors?.address}
          helperText={errors?.address}
        />
      </Grid>
    </Grid>
  );
}
