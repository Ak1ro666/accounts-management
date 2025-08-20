import { ChangeEvent } from 'react'
import { TablePagination } from '@mui/material'

import { TABLE_CONFIG } from '../../lib/constants'

export function Layout({
  count,
  onPageChange,
  onRowsPerPageChange,
  page,
  rowsPerPage
}: {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (_: unknown, newPage: number) => void
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <TablePagination
      rowsPerPageOptions={TABLE_CONFIG.rowPerPageOptions}
      component='div'
      count={count}
      labelRowsPerPage='Строк на странице:'
      labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count}`}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  )
}
