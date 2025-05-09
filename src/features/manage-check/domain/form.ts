import type { Account, AccountStatus } from "./account";

export type FormData = {
  code?: string;
  status?: AccountStatus;
  owner?: string;
  address?: string;
};

export type FormErrors = {
  code?: string[];
  owner?: string[];
  address?: string[];
};

export const getCreationDate = (account?: Account) =>
  (account?.createdAt
    ? new Date(account?.createdAt)
    : new Date()
  ).toLocaleDateString("ru-RU");
