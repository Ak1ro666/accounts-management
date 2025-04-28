import { AccountStatus } from "@/kernel/account";
import { getStatusConfig } from "../../domain/table";
import { Chip } from "@mui/material";

export function Layout({ status }: { status: AccountStatus }) {
  const { label, color } = getStatusConfig(status);

  return <Chip label={label} color={color} size="small" />;
}
