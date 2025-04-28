import { Button } from "@mui/material";

export function Layout({
  onClose,
  onSubmit,
  onReset,
  disabled,
}: {
  onClose: () => void;
  onSubmit: () => void;
  onReset: () => void;
  disabled: boolean;
}) {
  return (
    <>
      <Button
        disabled={disabled}
        onClick={onReset}
        variant="contained"
        color="success"
      >
        Сбросить
      </Button>
      <Button
        disabled={disabled}
        onClick={onClose}
        variant="contained"
        color="inherit"
      >
        Отмена
      </Button>
      <Button
        disabled={disabled}
        onClick={onSubmit}
        variant="contained"
        color="primary"
      >
        Сохранить
      </Button>
    </>
  );
}
