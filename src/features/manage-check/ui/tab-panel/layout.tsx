import { ReactNode } from "react";
import { Box } from "@mui/material";

export function Layout({
  index,
  value,
  children,
}: {
  children?: ReactNode;
  index: number;
  value: number;
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`account-tabpanel-${index}`}
      aria-labelledby={`account-tab-${index}`}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}
