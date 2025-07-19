/* eslint-disable react-hooks/exhaustive-deps */
import type { Account } from '../domain/account'
import type { UserFilters } from '../domain/filters'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { getFilteredItems } from '../domain/account'
import { isSearchActive, parseFiltersFromUrl } from '../domain/filters'
import { INITIAL_FILTERS } from '../lib/constants'

export function useFilters(items: Account[], defaultFilters?: UserFilters) {
  const [searchParams, setSearchParams] = useSearchParams()
  const userFilters = parseFiltersFromUrl(searchParams)

  const fullFilters: UserFilters = {
    ...INITIAL_FILTERS,
    ...defaultFilters,
    ...userFilters
  }

  const [isSearch, setIsSearch] = useState<boolean>(() =>
    isSearchActive(fullFilters)
  )

  const onChangeFilters = (name: keyof UserFilters, value: string) => {
    setSearchParams({ ...fullFilters, [name]: value })
  }

  const reset = () => {
    setSearchParams()
    setIsSearch(false)
  }

  const filteredCacheItems = useMemo(
    () => getFilteredItems(items, fullFilters),
    [items, fullFilters]
  )

  const filteredItems = isSearch ? filteredCacheItems : items

  const startSearch = () => {
    if (isSearchActive(fullFilters)) {
      setIsSearch(true)
    }
  }

  return [
    filteredItems,
    {
      data: fullFilters,
      onChangeFilters,
      reset,
      startSearch
    }
  ] as const
}
