import { ReactNode } from "react";

import { Box, Typography } from "@mui/material";

export function Layout({
  title,
  filters,
  tableFlow,
  actions,
  modals,
}: {
  title: ReactNode;
  filters: ReactNode;
  tableFlow: ReactNode;
  actions: ReactNode;
  modals: ReactNode;
}) {
  return (
    <>
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%", mr: 2 }}>{filters}</Box>
        {actions}
      </Box>
      {tableFlow}
      {modals}
    </>
  );
}
