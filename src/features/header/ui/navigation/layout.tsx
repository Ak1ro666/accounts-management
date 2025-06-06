import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

export function Layout({
  actions,
  email,
}: {
  actions?: ReactNode;
  email?: string;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography variant="body2" color="text.secondary">
        {email}
      </Typography>
      {actions}
    </Box>
  );
}
