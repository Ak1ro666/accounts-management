import { useMemo } from "react";

import { Account } from "@/kernel/account";

import {
  getSortedItemsString,
  type Direction,
  type SortQuery,
} from "../domain/query";
import { createSearchQueryParams } from "@/shared/infastructure/use-create-search-query";

export function useFilters(items: Account[]) {
  const useQueryParams = createSearchQueryParams<{
    query: SortQuery;
    direction: Direction;
  }>({
    direction: {
      name: "direction",
      defaultValue: "asc",
    },
    query: {
      name: "query",
      defaultValue: "code",
    },
  });

  const { params: selectedSort, updateParams } = useQueryParams();

  const sortedItems = useMemo(() => {
    return getSortedItemsString(
      items,
      selectedSort.query,
      selectedSort.direction,
    );
  }, [items, selectedSort]);

  return {
    data: sortedItems,
    onChangeSelected: updateParams,
    selectedSort,
  } as const;
}
