import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '/logo.svg';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Api as ApiIcon
} from '@mui/icons-material';

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'API Playground', icon: <ApiIcon />, path: '/api-playground' }
];

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#074481', padding: '10px 20px' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            mr: 4,
                            display: 'flex',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img src={logo} alt="BrightQuery" />
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {menuItems.map((item) => (
                            <Button
                                key={item.text}
                                color="inherit"
                                startIcon={item.icon}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    },
                                }}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar; 