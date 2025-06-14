import { ROUTES } from "@/shared/model/routes";
import { AccountBalance, AccessTime } from "@mui/icons-material";

export const NAV_ITEMS = [
  {
    path: ROUTES.ACCOUNTS,
    icon: <AccountBalance />,
    label: "Все аккаунты",
  },
  {
    path: ROUTES.RESENT_ACCOUNTS,
    icon: <AccessTime fontSize="small" />,
    label: "Недавние",
  },
];
