export type AccountStatus = "OPEN" | "CLOSED" | "PRE_CLOSED";
export type AccountId = string;

export type Charge = {
  id: string;
  amount: number;
  date: string;
};

export type Payment = {
  id: string;
  amount: number;
  date: string;
};

export type Account = {
  id: AccountId;
  code: string;
  status: AccountStatus;
  owner: string;
  address: string;
  debt: number;
  createdAt: Date;
  updatedAt: Date;
  charges: Charge[];
  payments: Payment[];
};

export const getSortByDate = <T extends Charge | Payment>(items: T[]): T[] => {
  return [...items].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
};
