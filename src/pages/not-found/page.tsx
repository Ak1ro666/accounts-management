import { Box, Button, Container, Typography } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

function Page() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        textAlign="center"
      >
        <Typography variant="h1" component="h1" color="primary" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/")}
          >
            Go to Homepage
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export const Component = Page;
