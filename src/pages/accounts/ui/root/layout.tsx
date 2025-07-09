import { type ReactNode } from 'react'
import { Box, Typography } from '@mui/material'

export function Layout({
  title,
  actionsPannel,
  flow,
  createForm,
  modals
}: {
  title: ReactNode
  actionsPannel: ReactNode
  flow: ReactNode
  createForm: ReactNode
  modals: ReactNode
}) {
  return (
    <Box sx={{ flexGrow: 1, height: '100%' }}>
      <Typography
        variant='h4'
        component='h1'>
        {title}
      </Typography>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Box sx={{ width: '100%', mr: 2 }}>{actionsPannel}</Box>
        {createForm}
      </Box>
      {flow}
      {modals}
    </Box>
  )
}
