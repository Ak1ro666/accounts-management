import { createStrictContext } from "@/shared/infastructure/strict-context";
import type { Account, AccountId, Charge, Payment } from "../../account";
import type { CreateData, UpdateData } from "./types";

export type AccountsApiContextType = {
  fetchAccounts: () => Promise<Account[]>;
  fetchAccountsCharges: (id: AccountId) => Promise<Charge[]>;
  fetchAccountsPayments: (id: AccountId) => Promise<Payment[]>;
  fetchAccountsById: (id: AccountId) => Promise<Account>;
  create: (data: CreateData) => Promise<Account>;
  update: (id: AccountId, data: UpdateData) => Promise<Account>;
  remove: (id: AccountId) => Promise<void>;
};

export const AccountsApiContext = createStrictContext<AccountsApiContextType>();
