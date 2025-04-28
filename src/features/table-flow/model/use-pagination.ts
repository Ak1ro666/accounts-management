import { useState } from "react";

import { Account } from "@/kernel/account";

export function usePagination(items: Account[]) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const onChangePage = (_: unknown, newPage: number) => setCurrentPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const data = items.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage,
  );

  return {
    data,
    currentPage,
    rowsPerPage,
    onChangePage,
    handleChangeRowsPerPage,
  } as const;
}
