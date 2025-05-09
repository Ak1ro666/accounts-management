import {
  AppBar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Toolbar,
} from "@mui/material";

export function Layout({
  title,
  body,
  header,
  footer,
  actions,
  ...otherProps
}: {
  title?: string;
  body?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  actions?: React.ReactNode;
  onClose?: () => void;
  fullScreen?: boolean;
} & DialogProps) {
  return (
    <Dialog maxWidth="md" {...otherProps}>
      {header && (
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>{header}</Toolbar>
        </AppBar>
      )}
      {title && <DialogTitle>{title}</DialogTitle>}
      <Box component="form">
        <DialogContent>
          {body}
          {footer}
        </DialogContent>
        <DialogActions>{actions}</DialogActions>
      </Box>
    </Dialog>
  );
}
