import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";

export function Layout({
  title,
  body,
  footer,
  onClose,
  isOpen,
}: {
  title: string;
  body: React.ReactNode;
  footer: React.ReactNode;
  onClose?: () => void;
  isOpen: boolean;
}) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {body}
        </Grid>
      </DialogContent>
      <DialogActions>{footer}</DialogActions>
    </Dialog>
  );
}
