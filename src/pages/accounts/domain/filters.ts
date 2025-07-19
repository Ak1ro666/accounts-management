import { SEARCH_QUERY_FILTERS } from '../lib/constants'

export type UserFilters = {
  owner: string
  status: string
  code: string
  from: string
  to: string
}

export const isSearchActive = (filters: UserFilters) =>
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
