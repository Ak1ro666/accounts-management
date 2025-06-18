import type { Direction, SortQuery } from '../domain/query'

import { useMemo } from 'react'

import { type Account } from '@/kernel/account'

import { createSearchQueryParams } from '@/shared/lib/react/use-create-search-query'

import { getSortedItemsString } from '../domain/query'

export function useFilters(items: Account[]) {
  const useQueryParams = createSearchQueryParams<{
    query: SortQuery
    direction: Direction
  }>({
    direction: {
      name: 'direction',
      defaultValue: 'asc'
    },
    query: {
      name: 'query',
      defaultValue: 'code'
    }
  })

  const { params: selectedSort, updateParams } = useQueryParams()

  const sortedItems = useMemo(() => {
    return getSortedItemsString(
      items,
      selectedSort.query,
      selectedSort.direction
    )
  }, [items, selectedSort])

  return {
    data: sortedItems,
    onChangeSelected: updateParams,
    selectedSort
  } as const
}
