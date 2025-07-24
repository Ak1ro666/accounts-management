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

export function useFilters() {
  const isSearch = useSearchStore((state) => state.isSearch)
  const setIsSearch = useSearchStore((state) => state.setIsSearch)
  const initializeIsSearch = useSearchStore((state) => state.initializeIsSearch)

  const [searchParams, setSearchParams] = useSearchParams()
  const userFilters = parseFiltersFromUrl(searchParams)

  const fullFilters: UserFilters = {
    ...INITIAL_FILTERS,
    ...userFilters
  }

  useEffect(() => {
    initializeIsSearch(fullFilters)
  }, [])

  const onChangeFilters = (name: keyof UserFilters, value: string) => {
    setSearchParams({ ...sanitizeFilters(fullFilters), [name]: value })
  }

  const reset = () => {
    setSearchParams()
    setIsSearch(false)
  }

  const getFilteredAccounts = (data: Account[]) => {
    const filteredCacheItems = getFilteredItems(data, fullFilters)
    const filteredItems = isSearch ? filteredCacheItems : data

    return filteredItems
  }

  const startSearch = () => {
    if (isSearchActive(fullFilters)) {
      setIsSearch(true)
    }
  }

  return {
    data: fullFilters,
    onChangeFilters,
    reset,
    startSearch,
    getFilteredAccounts
  }
}
