import type { FileNodeProps, FolderItemNode } from '../../domain/files-tree'

import { Delete as DeleteIcon, Folder as FolderIcon } from '@mui/icons-material'
import { IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material'

export function Layout({
  file,
  onNavigate,
  onDelete
}: FileNodeProps<FolderItemNode>) {
  return (
    <ListItem
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        mb: 1,
        '&:hover': {
          bgcolor: 'action.hover'
        },
        cursor: 'pointer'
      }}
      onClick={() => onNavigate(file)}>
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText
        primary={file.name}
        secondary={file.size}
      />
      <IconButton
        edge='end'
        aria-label='delete'
        onClick={(e) => {
          e.stopPropagation()
          onDelete(file.id)
        }}
        sx={{ color: 'error.main' }}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
