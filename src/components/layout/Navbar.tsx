import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Api as ApiIcon,
  PriceChange as PricingIcon,
  AccountCircle as ProfileIcon,
  Logout as LogoutIcon,
  Apps as AppsIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "API Playground", icon: <ApiIcon />, path: "/api" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAppsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAppsClose = () => {
    setAnchorEl(null);
  };

  const handleLogout=()=>{
    console.log('logout');
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#074481",
        padding: "10px 20px",
      }}
    >
      <Container maxWidth={false} disableGutters sx={{ width: "100%" }}>
        <Toolbar disableGutters className="headerMenu">
          <Typography
            variant="h6"
            component="div"
            sx={{
              mr: 4,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={logo} alt="BrightQuery" />
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  backgroundColor:
                    location.pathname === item.path
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
            <Button
              color="inherit"
              startIcon={<AppsIcon />}
              endIcon={<ArrowDropDownIcon />}
              onClick={handleAppsClick}
              aria-controls={open ? 'apps-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              Apps
            </Button>
            <Menu
              id="apps-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleAppsClose}
              MenuListProps={{
                'aria-labelledby': 'apps-button',
              }}
            >
              <MenuItem onClick={()=>window.open("https://locator2.brightquery.com/","_blank")}>Locator 2</MenuItem>
              <MenuItem onClick={()=>window.open("https://terminal2.brightquery.com/","_blank")}>Terminal 2</MenuItem>
              <MenuItem onClick={()=> window.open("https://prospector2.brightquery.com/", "_blank")}>Prospector 2</MenuItem>
            </Menu>
            <Button
              color="inherit"
              startIcon={<PricingIcon />}
              onClick={() => window.open("https://apps2.brightquery.com/pricing", "_blank")}
            >
              Pricing
            </Button>
            <Button
              color="inherit"
              startIcon={<ProfileIcon />}
              onClick={() => window.open("https://apps2.brightquery.com/profile", "_blank")}
            >
              Profile
            </Button>
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
