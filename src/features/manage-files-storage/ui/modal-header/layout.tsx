import { Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function Layout({ onCloseModal }: { onCloseModal: () => void }) {
  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        onClick={onCloseModal}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>
      <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
        Файловое хранилище
      </Typography>
      <Button autoFocus color="inherit" onClick={onCloseModal}>
        Сохранить
      </Button>
    </>
  );
}
