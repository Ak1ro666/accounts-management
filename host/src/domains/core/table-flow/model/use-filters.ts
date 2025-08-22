import type { Direction, SortQuery } from '../domain/query'

import { getSortedItemsString } from '../domain/query'

import { type Account } from '@/kernel(platform)/account'
import { useMyMemo } from '@/platform/lib/react/memo'
import { createSearchQueryParams } from '@/platform/lib/react/use-create-search-query'

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

  const sortedItems = useMyMemo(() => {
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
