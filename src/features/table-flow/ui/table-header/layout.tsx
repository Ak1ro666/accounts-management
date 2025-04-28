import { TableCell, TableSortLabel } from "@mui/material";

import { FORM_QUERY } from "../../lib/constants";
import { Direction, SortQuery } from "../../domain/query";

export function Layout({
  selectedSort,
  onChangeSelected,
}: {
  selectedSort: {
    query: SortQuery;
    direction: Direction;
  };
  onChangeSelected: ({
    query,
    direction,
  }: {
    query: SortQuery;
    direction: Direction;
  }) => void;
}) {
  return FORM_QUERY.map((query) => {
    if (query.disabled) {
      return <TableCell>{query.label}</TableCell>;
    }

    return (
      <TableCell>
        <TableSortLabel
          active={selectedSort.query === query.value}
          direction={selectedSort.direction}
          onClick={() =>
            onChangeSelected({
              query: query.value,
              direction: selectedSort.direction === "asc" ? "desc" : "asc",
            })
          }
        >
          {query.label}
        </TableSortLabel>
      </TableCell>
    );
  });
}
