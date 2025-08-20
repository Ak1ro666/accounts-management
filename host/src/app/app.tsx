import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

export function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Outlet />
    </Box>
  )
}
