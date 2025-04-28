import { UserFilters } from "./filters";

export type AccountStatus = "OPEN" | "CLOSED" | "PRE_CLOSED";
export type AccountId = string;

export type Account = {
  id: AccountId;
  code: string;
  status: AccountStatus;
  owner: string;
  address: string;
  debt: number;
  createdAt: Date;
  updatedAt: Date;
};

export const getFilteredItems = (
  items: Account[],
  filters: UserFilters,
): Account[] => {
  return items.filter((account) => {
    if (
      filters.owner &&
      !account.owner.toLowerCase().includes(filters.owner.toLowerCase())
    ) {
      return false;
    }

    if (filters.status && account.status !== filters.status) {
      return false;
    }

    if (
      filters.code &&
      !account.code.toLowerCase().includes(filters.code.toLowerCase())
    ) {
      return false;
    }

    if (filters.from) {
      const accountDate = new Date(account.createdAt);
      if (accountDate < filters.from) {
        return false;
      }
    }

    if (filters.to) {
      const accountDate = new Date(account.createdAt);
      const toDate = new Date(filters.to);
      toDate.setDate(toDate.getDate() + 1);

      if (accountDate >= toDate) {
        return false;
      }
    }

    return true;
  });
};
