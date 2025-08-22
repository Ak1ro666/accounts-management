import { TableCell, TableRow } from '@mui/material'

import { UiLoader } from '@/platform/ui/loader'

export function Layout() {
  return (
    <TableRow>
      <TableCell
        colSpan={6}
        align='center'>
        <UiLoader />
      </TableCell>
    </TableRow>
  )
}
