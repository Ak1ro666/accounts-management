export const API_URL = {
  root: (url: string) => `/api${url}`,

  accounts: (url: string = "") => API_URL.root(`/accounts/${url}`),
  accountsForId: (id: string) => API_URL.accounts(id),
  accountsStatus: (id: string) => API_URL.accounts(`${id}/status`),
  accountsCharges: (id: string) => API_URL.accounts(`${id}/charges`),
  accountsPayments: (id: string) => API_URL.accounts(`${id}/payments`),
};
