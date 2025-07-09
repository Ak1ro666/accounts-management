import { TableCell, TableRow } from '@mui/material'

import { UiLoader } from '@/shared/ui/kit/loader'

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
