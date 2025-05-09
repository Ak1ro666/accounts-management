import { API_URL } from "../api-config";
import type { Account, AccountId, Charge, Payment } from "../../account";
import { AccountsApiContextType } from "./accounts-api-provider";
import type { CreateData, UpdateData } from "./types";

export const api: AccountsApiContextType = {
  fetchAccounts: async (path?: string) => {
    return await fetch(API_URL.accounts(path)).then(
      (res) => res.json() as Promise<Account[]>,
    );
  },

  create: async (data: CreateData) => {
    return await fetch(API_URL.accounts(), {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => res.json() as Promise<Account>);
  },

  update: async (id: AccountId, data: UpdateData) => {
    return await fetch(API_URL.accounts(id), {
      method: "PATCH",
      body: JSON.stringify(data),
    }).then((res) => res.json() as Promise<Account>);
  },

  remove: async (id: AccountId) => {
    await fetch(API_URL.accounts(id), {
      method: "DELETE",
    });
  },

  fetchAccountsById: async (id: AccountId) => {
    return await fetch(API_URL.accountsForId(id)).then(
      (res) => res.json() as Promise<Account>,
    );
  },
  fetchAccountsCharges: async (id: AccountId) => {
    return await fetch(API_URL.accountsCharges(id)).then(
      (res) => res.json() as Promise<Charge[]>,
    );
  },

  fetchAccountsPayments: async (id: AccountId) => {
    return await fetch(API_URL.accountsPayments(id)).then(
      (res) => res.json() as Promise<Payment[]>,
    );
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
