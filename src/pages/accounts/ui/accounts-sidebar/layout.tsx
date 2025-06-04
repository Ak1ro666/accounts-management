import {
  Paper,
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import { NAV_ITEMS } from "./lib/data";

export function Layout({ className }: { className?: string }) {
  const isActive = (path: string) => window.location.pathname === path;
  const styles = useStyles();

  return (
    <Paper
      className={className}
      sx={{
        mt: 2,
        width: 256,
        borderRight: `1px solid ${styles.theme.palette.divider}`,
        p: 2,
        borderRadius: 0,
        boxShadow: "none",
      }}
    >
      <List
        subheader={
          <ListSubheader
            sx={{
              backgroundColor: "transparent",
              px: 0,
              color: styles.theme.palette.text.secondary,
              typography: "subtitle2",
            }}
          >
            Навигация
          </ListSubheader>
        }
      >
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={
                isActive(item.path) ? styles.activeStyle : styles.inactiveStyle
              }
            >
              <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">{item.label}</Typography>}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
