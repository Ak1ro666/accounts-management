import { type FormEvent, ReactNode } from "react";

import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function Layout({
  title,
  description,
  fields,
  actions,
  footer,
  onSubmit,
}: {
  title: ReactNode;
  description?: ReactNode;
  fields: ReactNode;
  actions: ReactNode;
  footer?: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f5f5f5" }}
    >
      <Card sx={{ minWidth: 400, padding: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            textAlign="center"
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            {title}
          </Typography>

          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            {description}
          </Typography>

          <form onSubmit={onSubmit}>
            {fields}
            {actions}
          </form>
          {footer}
        </CardContent>
      </Card>
    </Box>
  );
}

Layout.Footer = function AuthLayoutFooter({
  separatingText,
  footerText,
}: {
  separatingText: ReactNode;
  footerText: ReactNode;
}) {
  return (
    <>
      <Divider sx={{ my: 2 }}>{separatingText}</Divider>
      <Box textAlign="center" mt={2}>
        {footerText}
      </Box>
    </>
  );
};

Layout.Link = function AuthFormLink({
  text,
  linkText,
  url,
}: {
  text: ReactNode;
  linkText: ReactNode;
  url: string;
}) {
  return (
    <>
      <Box>{text}</Box>
      <Link to={url}>{linkText}</Link>
    </>
  );
};
