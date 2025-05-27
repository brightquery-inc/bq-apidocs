import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  GitHub,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const socialLinks = [
    { icon: <Facebook />, url: 'https://facebook.com' },
    { icon: <Twitter />, url: 'https://twitter.com' },
    { icon: <LinkedIn />, url: 'https://linkedin.com' },
    { icon: <GitHub />, url: 'https://github.com' },
  ];

  const quickLinks = [
    { text: 'About Us', url: '/about' },
    { text: 'Services', url: '/services' },
    { text: 'Contact', url: '/contact' },
    { text: 'Privacy Policy', url: '/privacy' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        pb: '10px',
        mt: '10px',
      }}
    >
      <Container maxWidth="lg">
     

        {/* Copyright */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 1, borderTop: '1px solid rgba(255, 255, 255, 0.1)', pt: 1 }}
        >
          © {new Date().getFullYear()}  BrightQuery, Inc. All rights reserved. |  
          <Link href="mailto:support@brightquery.com" sx={{color: 'white'}}> support@brightquery.com</Link> | 
          <Link href="https://brightquery.com/terms-of-use/" sx={{color: 'white'}}> Terms of Use</Link>

        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 