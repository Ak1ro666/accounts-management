export const getStatusConfig = (status: "OPEN" | "PRE_CLOSED" | "CLOSED") => {
  switch (status) {
    case "OPEN":
      return { label: "Открыт", color: "success" as const };
    case "PRE_CLOSED":
      return { label: "Предзакрыт", color: "warning" as const };
    case "CLOSED":
      return { label: "Закрыт", color: "error" as const };
    default:
      return { label: status, color: "default" as const };
  }
};

export const getDebtConfig = (debt?: number) =>
  debt ? debt.toFixed(2) : Number(0).toFixed(2);
