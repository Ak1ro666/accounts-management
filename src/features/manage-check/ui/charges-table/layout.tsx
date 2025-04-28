import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type { Charge } from "../../domain/account";

export function Layout({
  charges,
  isLoading,
}: {
  charges?: Charge[];
  isLoading: boolean;
}) {
  const totalAmount =
    charges?.reduce((sum, charge) => sum + charge.amount, 0) ?? 0;

  if (isLoading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (charges?.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={3} align="center">
          Нет начислений
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Начисления</Typography>
        <Typography variant="h6">Итого: {totalAmount.toFixed(2)} ₽</Typography>
      </Box>

      <Paper>
        <TableContainer sx={{ maxHeight: 300 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Дата</TableCell>
                <TableCell align="right">Сумма</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {charges?.map((charge) => (
                <TableRow key={charge.id} hover>
                  <TableCell>{charge.id}</TableCell>
                  <TableCell>
                    {new Date(charge.date).toLocaleDateString("ru-RU")}
                  </TableCell>
                  <TableCell align="right">
                    {charge.amount.toFixed(2)} ₽
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
