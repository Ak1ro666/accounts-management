import { AppBar, styled, Toolbar } from "@mui/material";
import { ReactNode } from "react";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[1],
}));

export function Layout({
  navigation,
  title,
}: {
  navigation: ReactNode;
  title: ReactNode;
}) {
  return (
    <StyledAppBar position="static" color="default">
      <Toolbar sx={{ maxWidth: "xl", mx: "auto", width: "100%" }}>
        {title}
        {navigation}
      </Toolbar>
    </StyledAppBar>
  );
}
