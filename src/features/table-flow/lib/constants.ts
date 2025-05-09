import type { SortQuery } from "../domain/query";

export const ROWS_PER_PAGE_OPTIONS = [10, 25, 50] as const;
export const ACCOUNT_STATUS = ["OPEN", "PRE_CLOSED", "CLOSED"] as const;
export const FORM_QUERY: {
  value: SortQuery;
  label?: string;
  id: number;
  disabled?: boolean;
}[] = [
  { value: "code", label: "Код счета", id: 1 },
  { value: "status", label: "Статус", id: 2 },
  { value: "owner", label: "Владелец", id: 3 },
  { value: "address", label: "Адрес", id: 4 },
  { value: "debt", label: "Задолженность", id: 5 },
  { value: "code", label: "Код счета", disabled: true, id: 6 },
] as const;
