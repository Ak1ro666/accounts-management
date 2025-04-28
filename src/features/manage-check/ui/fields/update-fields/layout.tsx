import { useState } from "react";
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";

import type { FormData, FormErrors } from "../../../domain/form";
import type { Account } from "../../../domain/account";

import { TabPanel } from "../../tab-panel";
import { ChargesTable } from "../../charges-table";
import { PaymentsTable } from "../../payments-table";

export function Layout({
  formData,
  errors,
  onChange,
  account,
  isLoading,
}: {
  formData: FormData;
  errors?: FormErrors;
  onChange: (name: string) => (value: string) => void;
  account?: Account;
  isLoading: boolean;
}) {
  const [tabValue, setTabValue] = useState<number>(0);

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name)(e.target.value);
  };

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={24} />
        </Box>
      ) : (
        <>
          <Grid size={{ xs: 12, sm: 6 }} mt={1}>
            <TextField
              name="code"
              label="Код счета"
              value={formData.code}
              onChange={onChangeField}
              fullWidth
              required
              disabled
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
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Дата создания"
              value={(account?.createdAt
                ? new Date(account?.createdAt)
                : new Date()
              ).toLocaleDateString("ru-RU")}
              fullWidth
              disabled
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Задолженность"
              value={`${(account?.debt ?? 0).toFixed(2)} ₽`}
              fullWidth
              disabled
            />
          </Grid>
        </>
      )}
      <Grid size={{ xs: 12 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
          >
            <Tab label="Начисления" id="account-tab-0" />
            <Tab label="Оплаты" id="account-tab-1" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <ChargesTable
            charges={account?.charges ?? []}
            isLoading={isLoading}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <PaymentsTable
            payments={account?.payments ?? []}
            isLoading={isLoading}
          />
        </TabPanel>
      </Grid>
    </>
  );
}
