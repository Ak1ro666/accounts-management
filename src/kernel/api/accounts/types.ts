import { AccountStatus } from "@/kernel/account";

export type CreateData = {
  code: string;
  status: AccountStatus;
  owner: string;
  address: string;
};

export type UpdateData = {
  code?: string;
  status?: AccountStatus;
  owner?: string;
  address?: string;
  updatedAt?: string;
};
