import { Link } from "@mui/material";

import type { Path } from "../../domain/files-tree";

export function Layout<T extends Path>({
  item,
  onClick,
  isLast,
}: {
  item: T;
  onClick: () => void;
  isLast: boolean;
}) {
  return (
    <Link
      key={item.id}
      color={isLast ? "text.primary" : "inherit"}
      onClick={onClick}
      sx={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
    >
      {item.name}
    </Link>
  );
}
