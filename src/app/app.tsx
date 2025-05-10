import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

export function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Outlet />
    </Box>
  );
}
