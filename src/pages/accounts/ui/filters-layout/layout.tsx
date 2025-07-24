import { Children, ReactNode } from 'react'
import { Grid } from '@mui/material'

export function Layout({
  children,
  renderChild
}: {
  children: ReactNode
  renderChild: (child: ReactNode) => ReactNode
}) {
  return (
    <Grid
      container
      spacing={2}
      alignItems='center'>
      {Children.map(children, renderChild)}
    </Grid>
  )
}
