import { useMemo, useState } from "react";

import { checkModalEventEmitter } from "@/kernel/check-modal";
import { AccountsApiContext } from "@/kernel/api/accounts";

import type { Account } from "../domain/account";

export function useUpdateCheckModal() {
  const api = AccountsApiContext.use();
  const [currentAccount, setCurrentAccount] = useState<Account>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  checkModalEventEmitter.useEvent("onChangeOpenModal", async (id) => {
    setIsOpen(true);
    setIsLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          Promise.all([
            api.fetchAccountsForId(id),
            Promise.resolve([
              {
                id: "c1",
                accountId: "1",
                amount: 100.0,
                date: "2024-12-05",
              },
              {
                id: "c2",
                accountId: "1",
                amount: 120.0,
                date: "2025-01-03",
              },
              {
                id: "c3",
                accountId: "1",
                amount: 120.0,
                date: "2023-01-03",
              },
              {
                id: "c4",
                accountId: "1",
                amount: 120.0,
                date: "2021-01-03",
              },
            ]), // api.fetchAccountsCharges(id),
            Promise.resolve([
              {
                id: "p1",
                accountId: "1",
                amount: 100.0,
                date: "2024-12-05",
              },
              {
                id: "p2",
                accountId: "1",
                amount: 120.0,
                date: "2025-01-03",
              }, // api.fetchAccountsPayments(id),
            ]),
          ])
            .then(([accountData, chargesData, paymentsData]) => {
              setCurrentAccount({
                ...accountData,
                charges: chargesData,
                payments: paymentsData,
              });
            })
            .finally(() => setIsLoading(false)),
        );
      }, 1000);
    });
  });

  const closeModal = () => {
    setIsOpen(false);
    setCurrentAccount(undefined);
  };

  const defaultAccountFormState = useMemo(
    () => ({
      address: currentAccount?.address,
      code: currentAccount?.code,
      status: currentAccount?.status,
      owner: currentAccount?.owner,
    }),
    [currentAccount],
  );

  return {
    isOpen,
    currentAccount,
    closeModal,
    isLoading,
    defaultAccountFormState,
  } as const;
}
