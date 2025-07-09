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
