import { TablePagination } from "@mui/material";

import type { Account, AccountId } from "@/kernel/account";
import type { UpdateData } from "@/kernel/api/accounts";
import { checkModalEventEmitter } from "@/kernel/check-modal";

import { Root } from "../ui/root";
import { StatusChip } from "../ui/chip";
import { TableBody } from "../ui/table-body";
import { TableHeader } from "../ui/table-header";

import { useDeleteConfirmation } from "../model/use-delete-confirmation";
import { usePagination } from "../model/use-pagination";
import { useFilters } from "../model/use-filters";

import { ROWS_PER_PAGE_OPTIONS } from "../lib/constants";

export function TableFlow({
  items,
  isLoading,
  remove,
  update,
}: {
  items: Account[];
  isLoading?: boolean;
  remove: (id: AccountId) => Promise<void>;
  update: (id: AccountId, data: UpdateData) => void;
}) {
  const filters = useFilters(items);
  const pagination = usePagination(filters.data);
  const onDeleteConfirmation = useDeleteConfirmation(remove);

  return (
    <Root
      header={
        <TableHeader
          selectedSort={filters.selectedSort}
          onChangeSelected={filters.onChangeSelected}
        />
      }
      body={
        <TableBody
          onDeleteClick={onDeleteConfirmation}
          onChangeStatus={(id, status) => update(id, { status })}
          items={pagination.data}
          isLoading={isLoading}
          renderChip={(status) => <StatusChip status={status} />}
          onEditClick={(id) =>
            checkModalEventEmitter.emit("onChangeOpenModal", id)
          }
        />
      }
      pagination={
        <TablePagination
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          component="div"
          count={items.length}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.currentPage}
          onPageChange={pagination.onChangePage}
          onRowsPerPageChange={pagination.handleChangeRowsPerPage}
          labelRowsPerPage="Строк на странице:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} из ${count}`
          }
        />
      }
    />
  );
}
