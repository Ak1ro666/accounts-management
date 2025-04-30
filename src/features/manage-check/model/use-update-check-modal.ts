import { useMemo, useState } from "react";

import { checkModalEventEmitter } from "@/kernel/check-modal";
import { AccountsApiContext } from "@/kernel/api/accounts";

import { ACCOUNTS_CHARGES, ACCOUNTS_PAYMENTS } from "../lib/constants";

import type { Account, AccountId } from "../domain/account";

export function useUpdateCheckModal() {
  const api = AccountsApiContext.use();
  const [account, setAccount] = useState<Account>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAccount = async (id: AccountId) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          Promise.all([
            api.fetchAccountsForId(id),
            Promise.resolve(ACCOUNTS_CHARGES), // api.fetchAccountsCharges(id),
            Promise.resolve(ACCOUNTS_PAYMENTS), // api.fetchAccountsPayments(id),
          ])
            .then(([accountData, chargesData, paymentsData]) => {
              setAccount({
                ...accountData,
                charges: chargesData,
                payments: paymentsData,
              });
            })
            .finally(() => setIsLoading(false)),
        );
      }, 1000);
    });
  };

  checkModalEventEmitter.useEvent("onChangeOpenModal", async (id) => {
    setIsOpen(true);
    setIsLoading(true);
    await fetchAccount(id);
  });

  const closeModal = () => {
    setIsOpen(false);
    setAccount(undefined);
  };

  const defaultAccountFormState = useMemo(
    () => ({
      address: account?.address,
      code: account?.code,
      status: account?.status,
      owner: account?.owner,
    }),
    [account],
  );

  return {
    isOpen,
    account,
    closeModal,
    refetch: fetchAccount,
    isLoading,
    defaultAccountFormState,
  } as const;
}
