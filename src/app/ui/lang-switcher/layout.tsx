import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export function Layout() {
  const { i18n, t } = useTranslation();

  return (
    <Button
      variant="contained"
      onClick={() => i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")}
    >
      {t("language")}
    </Button>
  );
}
