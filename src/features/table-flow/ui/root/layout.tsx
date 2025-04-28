import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ReactNode } from "react";

export function Layout({
  header,
  body,
  pagination,
}: {
  header: ReactNode;
  body: ReactNode;
  pagination: ReactNode;
}) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>{header}</TableRow>
          </TableHead>
          <TableBody>{body}</TableBody>
        </Table>
      </TableContainer>
      {pagination}
    </Paper>
  );
}
