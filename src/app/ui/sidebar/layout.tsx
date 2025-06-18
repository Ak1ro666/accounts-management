import { type ReactNode } from 'react'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Typography
} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

import { NAV_ITEMS } from './lib/data'
import { useStyles } from './styles'

export function Layout({
  className,
  switchers
}: {
  className?: string
  switchers: ReactNode
}) {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path
  const styles = useStyles()

  return (
    <Paper
      className={className}
      sx={{
        width: 256,
        border: `1px solid ${styles.theme.palette.divider}`,
        p: 2,
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1
      }}>
      <List
        subheader={
          <ListSubheader
            sx={{
              backgroundColor: 'transparent',
              px: 0,
              color: styles.theme.palette.text.secondary,
              typography: 'subtitle2'
            }}>
            Навигация
          </ListSubheader>
        }>
        {NAV_ITEMS.map(item => (
          <ListItem
            key={item.path}
            disablePadding
            sx={{ mb: 1 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={
                isActive(item.path) ? styles.activeStyle : styles.inactiveStyle
              }>
              <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant='body2'>{item.label}</Typography>}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {switchers}
    </Paper>
  )
}
