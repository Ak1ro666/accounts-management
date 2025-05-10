import { ReactNode } from "react";

import {
  IconButton,
  MenuItem,
  Select,
  TableCell,
  TableRow,
} from "@mui/material";

import { Delete, Edit } from "@mui/icons-material";

import type { Account, AccountId, AccountStatus } from "@/kernel/account";

import { UiLoader } from "@/shared/ui/kit/loader";

import { ACCOUNT_STATUS } from "../../lib/constants";
import { getDebtConfig } from "../../domain/table";

export function Layout({
  isLoading,
  items,
  onDeleteClick,
  onEditClick,
  onChangeStatus,
  renderChip,
}: {
  isLoading?: boolean;
  items?: Account[];
  onDeleteClick: (id: AccountId) => void;
  onEditClick: (id: AccountId) => void;
  onChangeStatus: (id: AccountId, status: AccountStatus) => void;
  renderChip: (status: AccountStatus) => ReactNode;
}) {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={6} align="center">
          <UiLoader />
        </TableCell>
      </TableRow>
    );
  }

  if (items?.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={6} align="center">
          Нет данных
        </TableCell>
      </TableRow>
    );
  }

  return items?.map((item) => (
    <TableRow key={item.id} hover>
      <TableCell>{item?.code}</TableCell>
      <TableCell>
        <Select
          value={item?.status}
          onChange={(e) =>
            onChangeStatus(item.id, e.target.value as AccountStatus)
          }
          size="small"
          sx={{ minWidth: 120 }}
        >
          {ACCOUNT_STATUS.map((status) => (
            <MenuItem key={status} value={status}>
              {renderChip(status)}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
      <TableCell>{item?.owner}</TableCell>
      <TableCell>{item?.address}</TableCell>
      <TableCell>{getDebtConfig(item.debt)} ₽</TableCell>
      <TableCell>
        <IconButton color="primary" onClick={() => onEditClick(item.id)}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => onDeleteClick(item.id)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  ));
}
