import { INITIAL_FILTERS, SEARCH_QUERY_FILTERS } from '../lib/constants'

export type UserFilters = {
  owner: string
  status: string
  code: string
  from: string
  to: string
}

export const isSearchActive = (filters: UserFilters): boolean =>
  Object.values(filters).some(Boolean)

export const parseFiltersFromUrl = (
  searchParams: URLSearchParams
): Partial<UserFilters> => {
  const filters: Partial<UserFilters> = {}

  for (const searchQuery of SEARCH_QUERY_FILTERS) {
    const value = searchParams.get(searchQuery)
    if (value) {
      filters[searchQuery] = value
    }
  }

  return filters
}

const isKeyOfUserFilters = (key: string): key is keyof UserFilters => {
  return key in INITIAL_FILTERS
}

export const sanitizeFilters = (filters: UserFilters) => {
  const newFilters: Partial<UserFilters> = {}

  for (const key in filters) {
    if (isKeyOfUserFilters(key) && !!filters[key])
      newFilters[key] = filters[key]
  }

  return newFilters
}
