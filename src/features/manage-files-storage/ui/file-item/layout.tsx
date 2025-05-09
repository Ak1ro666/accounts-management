import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import type { FileNode, FileNodeId } from "../../domain/files-tree";

export function Layout({
  file,
  onNavigate,
  onDelete,
}: {
  file: FileNode;
  onNavigate: (file: FileNode) => void;
  onDelete: (id: FileNodeId) => void;
}) {
  const isFileType = file.type === "file";

  return (
    <ListItem
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        mb: 1,
        "&:hover": {
          bgcolor: "action.hover",
        },
        cursor: isFileType ? "default" : "pointer",
      }}
      onClick={() => onNavigate(file)}
    >
      <ListItemIcon>{isFileType ? <FileIcon /> : <FolderIcon />}</ListItemIcon>
      <ListItemText
        primary={file.name}
        secondary={isFileType && file.size && `${file.size} bytes`}
      />
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(file.id);
        }}
        sx={{ color: "error.main" }}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}
