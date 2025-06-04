export type UserFilters = {
  owner: string;
  status: string;
  code: string;
  from: Date | null;
  to: Date | null;
};

export const isSearchActive = (filters: UserFilters) =>
  Object.values(filters).some((value) => Boolean(value));
