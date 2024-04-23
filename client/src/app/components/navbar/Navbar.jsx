"use client";

import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Logo";
import FreshFix from "../../../../public/FreshFix.png";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const pages = ["Products", "Pricing", "Blog"];

const colors = {
  "main-green": "#39DB4A",
  "light-green": "#39DB4A30",
  "soft-green": "#C2FFC8",
};

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar>
        <Container
          disableGutters={true}
          maxWidth={false}
          sx={{
            width: "100%",
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* content pages small size */}
          <div className="flex">
            {/* Logo */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <Logo />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: `${colors["main-green"]}` }}
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
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </div>
          {/* content pages large size */}
          <div className="flex items-center">
            {/* Logo */}
            <Box
              sx={{ display: { xs: "none", md: "flex", marginRight: "20px" } }}
            >
              <Logo />
              <Link href="/">
                <Image
                  src={FreshFix}
                  alt="FreshFix"
                  width={100}
                  height={50}
                  priority="true"
                />
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{
                    my: 2,
                    color: "#000",
                    display: "block",
                    "&:hover": {
                      color: `${colors["main-green"]}`,
                      backgroundColor: "transparent",
                      fontWeight: "bold",
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
