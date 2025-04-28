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

import type { Payment } from "../../domain/account";

export function Layout({
  payments,
  isLoading,
}: {
  payments: Payment[];
  isLoading: boolean;
}) {
  const totalAmount = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0,
  );

  if (isLoading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (payments.length === 0) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        Нет оплат
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Оплаты</Typography>
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
              {payments.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>
                    {new Date(payment.date).toLocaleDateString("ru-RU")}
                  </TableCell>
                  <TableCell align="right">
                    {payment.amount.toFixed(2)} ₽
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
