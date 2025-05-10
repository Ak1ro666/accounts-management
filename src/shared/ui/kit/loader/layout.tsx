import { Box, CircularProgress, SxProps, Theme } from "@mui/material";

export function Layout({ styles }: { styles?: SxProps<Theme> }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...styles,
      }}
    >
      <CircularProgress size={24} />
    </Box>
  );
}
