import { useState } from "react";
import { type Account, getSortByDateAsc } from "../../domain/account";
import { ChargesTable } from "../charges-table";
import { PaymentsTable } from "../payments-table";
import { TabPanel } from "../tab-panel";
import { Box, Button, Grid, Tab, Tabs } from "@mui/material";
import { UiLoader } from "@/shared/ui/loader";

export function Layout({
  isLoading,
  account,
  openFileStorage,
}: {
  isLoading: boolean;
  account?: Account;
  openFileStorage: () => void;
}) {
  const [tabValue, setTabValue] = useState<number>(0);

  return (
    <Grid size={{ xs: 12 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
        >
          <Tab label="Начисления" id="account-tab-0" />
          <Tab label="Оплаты" id="account-tab-1" />
          <Tab label="Документы" id="account-tab-2" />
        </Tabs>
      </Box>

      {isLoading ? (
        <UiLoader styles={{ mt: "60px" }} />
      ) : (
        <>
          <TabPanel value={tabValue} index={0}>
            <ChargesTable
              charges={getSortByDateAsc(account?.charges ?? [])}
              isLoading={isLoading}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <PaymentsTable
              payments={getSortByDateAsc(account?.payments ?? [])}
              isLoading={isLoading}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <Button
              onClick={openFileStorage}
              variant="contained"
              color="primary"
              fullWidth
            >
              Открыть хранилище документов
            </Button>
          </TabPanel>
        </>
      )}
    </Grid>
  );
}
