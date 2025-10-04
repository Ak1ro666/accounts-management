import type { Item } from '../../domain/item'

import { ReactNode } from 'react'

import { Box, List, ListSubheader, Paper } from '@mui/material'

import { useStyles } from './styles'

export function Layout({
  actions,
  items,
  renderItem
}: {
  actions: ReactNode
  items: Item[]
  renderItem: (item: Item) => ReactNode
}) {
  const styles = useStyles()

  return (
    <Paper
      data-testid='sidebar'
      sx={{
        maxWidth: 256,
        width: '100%',
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
        {items.map(renderItem)}
      </List>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {actions}
      </Box>
    </Paper>
  )
}
