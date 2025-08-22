import type { UserFilters } from '../domain/filters'

export function useChangeField(
  onChangeFilters: (name: keyof UserFilters, value: string) => void
) {
  return (name: keyof UserFilters) => (value: string | undefined) => {
    if (value) {
      onChangeFilters(name, value)
    }
  }
}
