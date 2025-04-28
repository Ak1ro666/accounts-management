import { useMemo, useState } from "react";

import { getFilteredItems, type Account } from "../domain/account";
import type { UserFilters } from "../domain/filters";

import {
  dateTransformer,
  defaultStringTransformer,
  createSearchQueryParams,
} from "@/shared/infastructure/use-create-search-query";

const initialFilters: UserFilters = {
  owner: "",
  status: "",
  code: "",
  from: new Date(),
  to: new Date(),
};

export function useFilters(items: Account[], defaultFilters?: UserFilters) {
  const useQueryParamsHook = createSearchQueryParams<UserFilters>({
    owner: {
      name: "owner",
      defaultValue: "",
      transformer: defaultStringTransformer,
    },
    status: {
      name: "status",
      defaultValue: "",
      transformer: defaultStringTransformer,
    },
    code: {
      name: "code",
      defaultValue: "",
      transformer: defaultStringTransformer,
    },
    from: {
      name: "from",
      defaultValue: null,
      transformer: dateTransformer,
    },
    to: {
      name: "to",
      defaultValue: null,
      transformer: dateTransformer,
    },
  });

  const {
    params: userFilters,
    updateParams: setUserFilters,
    resetParams,
  } = useQueryParamsHook();

  const fullFilters = {
    ...initialFilters,
    ...defaultFilters,
    ...userFilters,
  };

  const [isSearch, setIsSearch] = useState<boolean>(() => {
    return Object.values(fullFilters).some((value) => Boolean(value));
  });

  const reset = () => {
    resetParams();
    setIsSearch(false);
  };

  const filteredCacheItems = useMemo(
    () => getFilteredItems(items, fullFilters),
    [items, fullFilters],
  );

  const filteredItems = isSearch ? filteredCacheItems : items;

  const onStartSearch = () => {
    if (Object.values(fullFilters).some((value) => Boolean(value))) {
      setIsSearch(true);
    }
  };

  return [
    filteredItems,
    {
      data: fullFilters,
      onChangeFilters: setUserFilters,
      reset,
      onStartSearch,
    },
  ] as const;
}
