import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export function Layout({
  onDeleteClick,
  onEditClick,
}: {
  onDeleteClick: () => void;
  onEditClick: () => void;
}) {
  return (
    <>
      <IconButton color="primary" onClick={onEditClick}>
        <Edit />
      </IconButton>
      <IconButton color="error" onClick={onDeleteClick}>
        <Delete />
      </IconButton>
    </>
  );
}
