import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#F3F3F3",
        color: "#8D8D8D",
        pb: "10px",
        mt: "10px",
      }}
    >
      <Container maxWidth="lg">
        {/* Copyright */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 1, borderTop: "1px solid rgba(255, 255, 255, 0.1)", pt: 1 }}
        >
          © {new Date().getFullYear()} BrightQuery, Inc. All rights reserved. |
          <Link
            href="mailto:support@brightquery.com"
            sx={{ color: "#8D8D8D", textDecoration: "none" }}
          >
            {" "}
            support@brightquery.com
          </Link>{" "}
          |
          <Link
            href="https://brightquery.com/terms-of-use/"
            sx={{ color: "#8D8D8D", textDecoration: "none" }}
          >
            {" "}
            Terms of Use
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
