import { useState } from "react";
import { type Account, getSortByDateAsc } from "../../domain/account";
import { ChargesTable } from "../charges-table";
import { PaymentsTable } from "../payments-table";
import { TabPanel } from "../tab-panel";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import { UiLoader } from "@/shared/ui/loader";

export function Layout({
  isLoading,
  account,
}: {
  isLoading: boolean;
  account?: Account;
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
        </>
      )}
    </Grid>
  );
}
