import { type ReactNode } from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

import { TableLoader } from '../table-loader'

export function Layout({
  header,
  body,
  footer,
  isLoading
}: {
  header: ReactNode
  body: ReactNode
  footer: ReactNode
  isLoading?: boolean
}) {
  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        maxHeight: 'calc(100vh - 250px)',
        height: '100%'
      }}>
      <TableContainer sx={{ height: '92%' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>{header}</TableRow>
          </TableHead>
          <TableBody>
            {isLoading && <TableLoader />}
            {body}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>{footer}</Box>
    </Paper>
  )
}
