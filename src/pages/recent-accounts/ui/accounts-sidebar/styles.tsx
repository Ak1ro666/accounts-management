import { useTheme } from "@mui/material";

export function useStyles() {
  const theme = useTheme();

  const activeStyle = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  };

  const inactiveStyle = {
    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  };

  return {
    activeStyle,
    inactiveStyle,
    theme,
  } as const;
}
