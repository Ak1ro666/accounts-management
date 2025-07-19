import type { Direction, FormQueryItem, SortQuery } from '../../domain/query'

import { TableCell, TableSortLabel } from '@mui/material'

import { FORM_QUERY } from '../../lib/constants'

export function Layout({
  selectedSort,
  onChangeSelected
}: {
  selectedSort: {
    query: SortQuery
    direction: Direction
  }
  onChangeSelected: (params: { query: SortQuery; direction: Direction }) => void
}) {
  const renderFormQuery = (query: FormQueryItem) => {
    if (query.disabled) {
      return <TableCell key={query.id}>{query.label}</TableCell>
    }

    return (
      <TableCell key={query.id}>
        <TableSortLabel
          active={selectedSort.query === query.value}
          direction={selectedSort.direction}
          onClick={() =>
            onChangeSelected({
              query: query.value,
              direction: selectedSort.direction
            })
          }>
          {query.label}
        </TableSortLabel>
      </TableCell>
    )
  }

  return FORM_QUERY.map(renderFormQuery)
}
