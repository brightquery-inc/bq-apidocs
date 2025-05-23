import React from "react";
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
        }}
      >
        Dashboard
      </Typography>
    </Box>
  );
};

export default Dashboard;
