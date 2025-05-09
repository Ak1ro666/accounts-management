import { useMemo, useState } from "react";

import { AccountsApiContext } from "@/kernel/api/accounts";
import type { UpdateData, CreateData } from "@/kernel/api/accounts";

import { useQuery } from "@/shared/infastructure/use-query";

import {
  type Account,
  type AccountId,
  getFilteredRemoveAccounts,
  removeAccount,
} from "../domain/account";

export function useAccounts() {
  const api = AccountsApiContext.use();
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery<Account[]>({
    fetcher: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(api.fetchAccounts());
        }, 1000);
      }),
    options: {
      subscribeTimeout: 1000,
    },
  });

  const [removedAccounts, setRemovedAccounts] = useState<AccountId[]>([]);

  const remove = async (id: AccountId) => {
    setRemovedAccounts((lastState) => [...lastState, id]);

    await api
      .remove(id)
      .then(refetch)
      .finally(() => setRemovedAccounts(removeAccount(removedAccounts, id)));
  };

  const update = async (id: AccountId, data: UpdateData) => {
    await api
      .update(id, { ...data, updatedAt: new Date().toISOString() })
      .then(refetch);
  };

  const create = async (body: CreateData) => {
    await api.create(body).then(refetch);
  };

  const fullAccounts = useMemo(
    () => getFilteredRemoveAccounts(data, removedAccounts),
    [data, removedAccounts],
  );

  const ownerOptions = useMemo(() => data.map((acc) => acc.owner), [data]);

  return {
    data: fullAccounts,
    refetch,
    remove,
    update,
    create,
    isLoading,
    ownerOptions,
  } as const;
}
