export const ROWS_PER_PAGE_OPTIONS = [10, 25, 50] as const;
export const ACCOUNT_STATUS = ["OPEN", "PRE_CLOSED", "CLOSED"] as const;
export const FORM_QUERY = [
  { value: "code", label: "Код счета", disabled: false },
  { value: "status", label: "Статус", disabled: false },
  { value: "owner", label: "Владелец", disabled: false },
  { value: "address", label: "Адрес", disabled: false },
  { value: "debt", label: "Задолженность", disabled: false },
  { label: "Код счета", disabled: true },
] as const;
