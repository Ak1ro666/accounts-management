export const ROWS_PER_PAGE_OPTIONS = [10, 25, 50] as const;
export const ACCOUNT_STATUS = ["OPEN", "PRE_CLOSED", "CLOSED"] as const;
export const FORM_QUERY = [
  { value: "code", label: "Код счета", disabled: false, id: 1 },
  { value: "status", label: "Статус", disabled: false, id: 2 },
  { value: "owner", label: "Владелец", disabled: false, id: 3 },
  { value: "address", label: "Адрес", disabled: false, id: 4 },
  { value: "debt", label: "Задолженность", disabled: false, id: 5 },
  { label: "Код счета", disabled: true, id: 6 },
] as const;
