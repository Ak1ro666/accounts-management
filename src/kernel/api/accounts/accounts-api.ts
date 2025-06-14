import { API_URL } from "../api-config";
import type { Account, AccountId, Charge, Payment } from "../../account";
import { AccountsApiContextType } from "./accounts-api-provider";
import type { CreateData, UpdateData } from "./types";
import { href } from "@/shared/model/routes";
import { authorizedApiClient } from "@/shared/api/instance";

export const api: AccountsApiContextType = {
  fetchAccounts: async () => {
    return await authorizedApiClient<Account[]>({
      url: API_URL.ACCOUNTS,
    });
  },

  create: async (data: CreateData) => {
    return await authorizedApiClient<Account>({
      url: API_URL.ACCOUNTS,
      method: "POST",
      json: data,
    });
  },

  update: async (id: AccountId, data: UpdateData) => {
    return await authorizedApiClient<Account>({
      url: href(API_URL.ACCOUNTS_FOR_ID, { accountId: id }),
      method: "PUT",
      json: data,
    });
  },

  remove: async (id: AccountId) => {
    await authorizedApiClient({
      url: href(API_URL.ACCOUNTS_FOR_ID, { accountId: id }),
      method: "DELETE",
    });
  },

  fetchAccountsById: async (id: AccountId) => {
    return await authorizedApiClient<Account[]>({
      url: `/accounts?id=${id}`,
    });
  },
  fetchAccountsCharges: async (id: AccountId) => {
    return await authorizedApiClient<Charge[]>({
      url: href(API_URL.ACCOUNTS_CHARGES, { id }),
    });
  },

  fetchAccountsPayments: async (id: AccountId) => {
    return await authorizedApiClient<Payment[]>({
      url: href(API_URL.ACCOUNTS_PAYMENTS, { id }),
    });
  },
};

// export const mockApi: AccountsApiContextType = {
//   fetchAccounts: async () => {
//     return await new Promise<Account[]>((resolve) => {
//       setTimeout(() => {
//         resolve([]);
//       }, 2000);
//     });
//   },

//   create: async (account: Account) => {
//     return await new Promise<Account>((resolve) => {
//       setTimeout(() => {
//         // [].push(account);
//         resolve([]);
//       }, 2000);
//     });
//   },

//   update: async (id: string, data: Account) => {
//     return await new Promise((resolve) => {
//       setTimeout(() => {
//         resolve();
//       }, 1000);
//     });
//   },

//   remove: async (id: string) => {
//     // const accountIndex = MockAccounts.findIndex((acc) => acc.id === id);

//     // MockAccounts.splice(accountIndex, 1);
//     return await new Promise((resolve) => {
//       setTimeout(() => {
//         resolve();
//       }, 1000);
//     });
//   },
// };
