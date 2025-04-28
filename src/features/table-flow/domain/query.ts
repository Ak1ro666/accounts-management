import { Account } from "@/kernel/account";

export type SortQuery = "code" | "status" | "owner" | "address" | "debt";
export type Direction = "asc" | "desc";

export const getSortedItemsString = (
  items: Account[],
  query: SortQuery,
  direction: Direction,
): Account[] => {
  const copyItems = [...items];

  copyItems.sort((a, b) => {
    if (typeof a[query] === "string" && typeof b[query] === "string") {
      return direction === "asc"
        ? a[query].localeCompare(b[query])
        : b[query].localeCompare(a[query]);
    } else if (typeof a[query] === "number" && typeof b[query] === "number") {
      return direction === "asc" ? a[query] - b[query] : b[query] - a[query];
    }

    return 0;
  });

  return copyItems;
};
