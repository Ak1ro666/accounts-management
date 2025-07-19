import { UserFilters } from '../domain/filters'

export const SELECT_FILTERS: { value: string; label: string }[] = [
  { value: '', label: 'Все' },
  { value: 'OPEN', label: 'Открыт' },
  { value: 'PRE_CLOSED', label: 'Предзакрыт' },
  { value: 'CLOSED', label: 'Закрыт' }
]

export const API_CONFIG = {
  refetchInterval: 5000,
  mockDelay: 1500
}

export const SEARCH_QUERY_FILTERS: (keyof UserFilters)[] = [
  'code',
  'from',
  'owner',
  'status',
  'to'
]

export const INITIAL_FILTERS: UserFilters = {
  owner: '',
  status: '',
  code: '',
  from: '',
  to: ''
}
//  chat gpt conditijkonal types, filters, infrastructure
