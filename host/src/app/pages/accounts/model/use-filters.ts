/* eslint-disable react-hooks/exhaustive-deps */
import type { UserFilters } from '../domain/filters'

import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { create } from 'zustand'

import { Account, getFilteredItems } from '../domain/account'
import {
  isSearchActive,
  parseFiltersFromUrl,
  sanitizeFilters
} from '../domain/filters'
import { INITIAL_FILTERS } from '../lib/constants'

type Store = {
  isSearch: boolean
  setIsSearch: (value: boolean) => void
  initializeIsSearch: (filters: UserFilters) => void
}

const useSearchStore = create<Store>((set) => ({
  isSearch: false,
  setIsSearch: (value: boolean) => set({ isSearch: value }),
  initializeIsSearch: (filters: UserFilters) => {
    set({ isSearch: isSearchActive(filters) })
  }
}))

function useIsSearch() {
  const isSearch = useSearchStore((state) => state.isSearch)
  const setIsSearch = useSearchStore((state) => state.setIsSearch)
  const initializeIsSearch = useSearchStore((state) => state.initializeIsSearch)

  return {
    data: isSearch,
    onChange: setIsSearch,
    initializeIsSearch
  }
}

export function useFilters() {
  const isSearchStore = useIsSearch()
  const [searchParams, setSearchParams] = useSearchParams()
  const userFilters = parseFiltersFromUrl(searchParams)

  const fullFilters: UserFilters = {
    ...INITIAL_FILTERS,
    ...userFilters
  }

  useEffect(() => {
    isSearchStore.initializeIsSearch(fullFilters)
  }, [])

  const onChangeFilters = (name: keyof UserFilters, value: string) => {
    setSearchParams({ ...sanitizeFilters(fullFilters), [name]: value })
  }

  const reset = () => {
    setSearchParams()
    isSearchStore.onChange(false)
  }

  const getFilteredData = (data: Account[]) => {
    const filteredCacheItems = getFilteredItems(data, fullFilters)
    const filteredItems = isSearchStore ? filteredCacheItems : data

    return filteredItems
  }

  const startSearch = () => {
    if (isSearchActive(fullFilters)) {
      isSearchStore.onChange(true)
    }
  }

  return {
    data: fullFilters,
    onChangeFilters,
    reset,
    startSearch,
    getFilteredData
  }
}
