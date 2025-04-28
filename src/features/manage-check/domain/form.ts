import { AccountStatus } from "./account";

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
