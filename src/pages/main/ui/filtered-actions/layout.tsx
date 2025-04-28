import { Button } from "@mui/material";

export function Layout({
  onResetClick,
  onSearchClick,
}: {
  onResetClick: () => void;
  onSearchClick: () => void;
}) {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={onSearchClick}
        fullWidth
      >
        Поиск
      </Button>
      <Button variant="outlined" onClick={onResetClick} fullWidth>
        Сброс
      </Button>
    </>
  );
}
