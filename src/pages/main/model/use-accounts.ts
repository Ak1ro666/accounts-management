import { useMemo, useState } from "react";

import { AccountsApiContext } from "@/kernel/api/accounts";
import { useLoad } from "@/shared/infastructure/use-load";

import type { Account, AccountId } from "../domain/account";
import type { UpdateData, CreateData } from "@/kernel/api/accounts";

export function useAccounts() {
  const api = AccountsApiContext.use();
  const {
    data = [],
    isLoading,
    refetch,
  } = useLoad<Account[]>(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(api.fetchAccounts());
        }, 1000);
      }),
  );
  const [removedAccounts, setRemovedAccounts] = useState<AccountId[]>([]);

  const remove = async (id: AccountId) => {
    try {
      setRemovedAccounts((lastState) => [...lastState, id]);

      await api.remove(id);
      await refetch();
    } finally {
      setRemovedAccounts((lastState) => lastState.filter((i) => i !== id));
    }
  };

  const update = async (id: AccountId, data: UpdateData) => {
    await api.update(id, data).finally(refetch);
  };

  const create = async (body: CreateData) => {
    await api.create(body).finally(refetch);
  };

  const fullAccounts = useMemo(() => {
    return [...data].filter((acc) => !removedAccounts.includes(acc.id));
  }, [data, removedAccounts]);

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
