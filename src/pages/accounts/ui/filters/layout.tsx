import { ReactNode, useMemo } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Autocomplete,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import type { UserFilters } from "../../domain/filters";
import { SELECT_FILTERS } from "../../lib/constants";

export function Layout({
  filters,
  onChangeFilters,
  filtersActions,
  ownerOptions,
}: {
  filters: UserFilters;
  onChangeFilters: (updates: Partial<UserFilters>) => void;
  filtersActions: ReactNode;
  ownerOptions: string[];
}) {
  const handleChangeField =
    (name: keyof UserFilters) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeFilters({ [name]: e.target.value });
    };

  const gridSize = useMemo(() => ({ xs: 12, sm: 6, md: 2 }), []);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={gridSize}>
        <TextField
          label="Код счета"
          value={filters.code}
          onChange={handleChangeField("code")}
          fullWidth
          size="small"
        />
      </Grid>

      <Grid size={gridSize}>
        <FormControl fullWidth size="small">
          <InputLabel>Статус</InputLabel>
          <Select
            value={filters.status}
            onChange={(e) => onChangeFilters({ status: e.target.value })}
            label="Статус"
            name="status"
          >
            {SELECT_FILTERS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={gridSize}>
        <Autocomplete
          freeSolo
          options={ownerOptions}
          inputValue={filters.owner}
          onInputChange={(_, newValue) => onChangeFilters({ owner: newValue })}
          renderInput={(params) => (
            <TextField {...params} label="Владелец" size="small" />
          )}
        />
      </Grid>

      <Grid size={gridSize}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Дата с"
            value={filters.from}
            onChange={(value) => onChangeFilters({ from: value })}
            slotProps={{ textField: { size: "small", fullWidth: true } }}
          />
        </LocalizationProvider>
      </Grid>

      <Grid size={gridSize}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Дата по"
            value={filters.to}
            onChange={(value) => onChangeFilters({ to: value })}
            slotProps={{ textField: { size: "small", fullWidth: true } }}
          />
        </LocalizationProvider>
      </Grid>

      <Grid size={gridSize}>
        <Box sx={{ display: "flex", gap: 1 }}>{filtersActions}</Box>
      </Grid>
    </Grid>
  );
}
