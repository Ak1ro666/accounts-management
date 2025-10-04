import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import { Link } from 'react-router-dom'

import { Item } from '../../domain/item'
import { useStyles } from './styles'

export function Layout<T extends Item = Item>({
  isActive,
  item
}: {
  item: T
  isActive: (path: T['path']) => boolean
}) {
  const styles = useStyles()

  return (
    <ListItem
      key={item.path}
      disablePadding
      sx={{ mb: 1 }}>
      <ListItemButton
        component={Link}
        to={item.path}
        sx={isActive(item.path) ? styles.activeStyle : styles.inactiveStyle}>
        <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={<Typography variant='body2'>{item.label}</Typography>}
        />
      </ListItemButton>
    </ListItem>
  )
}
