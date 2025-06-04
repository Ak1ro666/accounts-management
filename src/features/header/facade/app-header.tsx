import { useNavigate } from "react-router-dom";

import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import { appSessionStore } from "@/shared/model/session";

import { ROUTES } from "@/shared/model/routes";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[1],
}));

export function AppHeader() {
  const session = appSessionStore.useSession();
  const navigate = useNavigate();

  const logout = () => {
    navigate(ROUTES.SIGN_IN);
    appSessionStore.removeSessionToken();
  };

  return (
    <StyledAppBar position="static" color="default">
      <Toolbar sx={{ maxWidth: "xl", mx: "auto", width: "100%" }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ flexGrow: 1, position: "relative", display: "inline" }}
        >
          Лицевые счета
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {session?.email}
          </Typography>

          <Button variant="contained" size="small" onClick={logout}>
            Выйти
          </Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}
