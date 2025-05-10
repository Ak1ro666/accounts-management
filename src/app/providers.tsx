import { ReactNode } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { accountsApi, AccountsApiContext } from "@/kernel/api/accounts";

import { themeConfig } from "@/shared/model/theme-config";
import { UiConfirmation } from "@/shared/ui/kit/confirmation";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline />
      <UiConfirmation>
        <AccountsApiContext.Provider value={accountsApi}>
          {children}
        </AccountsApiContext.Provider>
      </UiConfirmation>
    </ThemeProvider>
  );
}
