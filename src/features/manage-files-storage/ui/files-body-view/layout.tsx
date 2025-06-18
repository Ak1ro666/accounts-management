import type { Path } from '../../domain/files-tree'

import { ReactNode } from 'react'
import { Box, Breadcrumbs, List, Paper, Typography } from '@mui/material'

export function Layout({
  files,
  path,
  renderPath,
  form,
  title
}: {
  files: ReactNode
  path: Path[]
  renderPath: (item: Path, index: number) => ReactNode
  form: ReactNode
  title: ReactNode
}) {
  return (
    <Paper
      elevation={3}
      sx={{ p: 3, width: '100%' }}>
      <Typography
        variant='h5'
        gutterBottom>
        {title}
      </Typography>

      <Breadcrumbs
        aria-label='breadcrumb'
        sx={{ mb: 2 }}>
        {path.map((item, index) => renderPath(item, index))}
      </Breadcrumbs>

      <Box sx={{ mb: 3 }}>{form}</Box>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>{files}</List>
    </Paper>
  )
}
