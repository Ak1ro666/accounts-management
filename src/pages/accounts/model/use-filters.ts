import { useMemo, useState } from "react";

import {
  dateTransformer,
  defaultStringTransformer,
  createSearchQueryParams,
} from "@/shared/infastructure/use-create-search-query";

import { getFilteredItems, type Account } from "../domain/account";
import { isSearchActive, type UserFilters } from "../domain/filters";

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

  const [isSearch, setIsSearch] = useState<boolean>(() =>
    isSearchActive(fullFilters),
  );

  const reset = () => {
    resetParams();
    setIsSearch(false);
  };

  const filteredCacheItems = useMemo(
    () => getFilteredItems(items, fullFilters),
    [items, fullFilters],
  );

  const filteredItems = isSearch ? filteredCacheItems : items;

  const startSearch = () => {
    if (isSearchActive(fullFilters)) {
      setIsSearch(true);
    }
  };

  return [
    filteredItems,
    {
      data: fullFilters,
      onChangeFilters: setUserFilters,
      reset,
      startSearch,
    },
  ] as const;
}
