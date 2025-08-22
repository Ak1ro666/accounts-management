import { ChangeEvent, useState } from 'react'

import { TABLE_CONFIG } from '../lib/constants'

import { Account } from '@/kernel(platform)/account'

export function usePagination(items: Account[]) {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    TABLE_CONFIG.defaultRowsPerPage
  )

  const onChangePage = (_: unknown, newPage: number) => setCurrentPage(newPage)

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setCurrentPage(0)
  }

  const data = items.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  )

  return {
    data,
    getContainerProps: () => ({
      page: currentPage,
      rowsPerPage,
      onPageChange: onChangePage,
      onRowsPerPageChange: handleChangeRowsPerPage
    })
  } as const satisfies { data: Account[] } & Record<string, unknown>
}
