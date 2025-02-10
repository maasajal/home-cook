"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Menu,
  Toolbar,
  Box,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
// MUI Icons
import MenuIcon from "@mui/icons-material/Menu";

const navItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Chefs",
    path: "/chefs",
  },
  {
    name: "Meals",
    path: "/meals",
  },
  {
    name: "Orders",
    path: "/orders",
  },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#000000A6] backdrop-blur-sm text-white">
      <motion.div
        className="container mx-auto px-4 py-1"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <Toolbar>
          {/* Logo for Desktop */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                color: "#FFA500", // Orange color on hover
              },
            }}
          >
            Home Cook
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {navItems.map((page) => (
                <Button
                  key={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block", color: "black" }}
                >
                  <Link href={page.path} className="no-underline">
                    {page.name}
                  </Link>
                </Button>
              ))}
            </Menu>
          </Box>

          {/* Logo for Mobile */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                color: "#FFA500", // Orange color on hover
              },
            }}
          >
            HC
          </Typography>

          {/* Desktop Menu Items */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              gap: 2, // Add gap between menu items
            }}
          >
            {navItems.map((page) => (
              <Button
                key={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  "&:hover": {
                    color: "#FFA500", // Orange color on hover
                    transform: "scale(1.1)", // Slight scale effect on hover
                  },
                  transition: "all 0.3s ease", // Smooth transition
                }}
              >
                <Link href={page.path} className="no-underline">
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>

          {/* Order Now Button */}
          <Box sx={{ flexGrow: 0 }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                backgroundColor: "#FFA500", // Orange background
                "&:hover": {
                  backgroundColor: "#FF8C00", // Darker orange on hover
                  transform: "scale(1.05)", // Slight scale effect on hover
                },
                transition: "all 0.3s ease", // Smooth transition
                borderRadius: "8px", // Rounded corners
                padding: "8px 16px", // Padding for better appearance
              }}
            >
              <Link href="/" className="no-underline font-bold">
                Order Now
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </motion.div>
    </header>
  );
};

export default Navbar;
