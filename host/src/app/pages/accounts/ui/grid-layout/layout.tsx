import { ReactNode } from 'react'
import { Grid } from '@mui/material'

import { GRID_SIZE } from '../../lib/constants'

export function Layout({ children }: { children: ReactNode }) {
  return <Grid size={GRID_SIZE}>{children}</Grid>
}
