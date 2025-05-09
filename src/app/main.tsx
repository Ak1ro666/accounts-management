import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";

import { Box, Container, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./providers/router";
import { accountsApi, AccountsApiContext } from "@/kernel/api/accounts";
import { UiConfirmation } from "@/shared/ui/confirmation";
import { themeConfig } from "./providers/theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={themeConfig}>
        <Container maxWidth="xl">
          <Box sx={{ my: 4 }}>
            <AccountsApiContext.Provider value={accountsApi}>
              <UiConfirmation>
                <AppRouter />
              </UiConfirmation>
            </AccountsApiContext.Provider>
          </Box>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
