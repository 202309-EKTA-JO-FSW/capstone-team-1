"use client";

import {
  AppBar,
  Avatar,
  Badge,
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
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import Btn from "../Btn";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { loginUser } from "@/app/redux/features/auth/AuthSlice";
import { itemsCount } from "@/app/redux/features/cart/CartSlice";
import { fetchCart } from "@/app/lib/data";
import placeholderImage from "../../../../public/Avatar-Profile-Image.png";

const pages = [
  { name: "home", path: "/" },
  { name: "restaurant", path: "/restaurant" },
  { name: "about us", path: "/about-us" },
  { name: "contact us", path: "/contact" },
  { name: "my restaurant", path: "/my-restaurant" },
];

const colors = {
  "main-green": "#39DB4A",
  "light-green": "#39DB4A30",
  "soft-green": "#C2FFC8",
};

function Navbar() {
  const currentPath = usePathname();
  const dispatch = useAppDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.authReducer.value);

  useEffect(() => {
    // Function to handle local storage change event
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUserInfo(storedUser);
    };
    // Add event listener for storage change
    window.addEventListener("storage", handleStorageChange);
    // Initial setup
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setUserInfo(storedUser);
    setLoading(false);
    // Cleanup function
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Dispatch login action if user is logged in
    if (userInfo) {
      dispatch(
        loginUser({
          isAdmin: userInfo.isAdmin,
          restaurant: userInfo.restaurant,
        })
      );
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    const getCart = async () => {
      if (user.isLogin) {
        const cart = await fetchCart();
        dispatch(itemsCount(cart.itemsCount));
      }
    };
    getCart();
  }, [user]);

  // get items count in cart
  const cartItemsCount = useAppSelector((state) => state.cartReducer.value);

  // menu toggle
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // check the ccurent page
  const isActive = (path) => {
    return path === "/" ? currentPath === path : currentPath.startsWith(path);
  };

  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        backgroundColor: "white",
        color: "black",
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
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
                {pages.map((page) => {
                  if (
                    page.path === "/my-restaurant" &&
                    (!userInfo || (userInfo && !userInfo.isAdmin))
                  ) {
                    return null;
                  } else {
                    return (
                      <Link href={page.path} key={page.name}>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Typography
                            textAlign="center"
                            sx={{
                              color: `${
                                isActive(page.path)
                                  ? colors["main-green"]
                                  : "black"
                              }`,
                              fontWeight: `${
                                isActive(page.path) ? "bold" : ""
                              }`,
                              display: "block",
                              "&:hover": {
                                color: `${colors["main-green"]}`,
                                backgroundColor: "transparent",
                              },
                            }}
                          >
                            {page.name}
                          </Typography>
                        </MenuItem>
                      </Link>
                    );
                  }
                })}
              </Menu>
            </Box>
          </Box>

          {/* content pages large size */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 3 }}>
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
              {pages.map((page) => {
                if (
                  page.path === "/my-restaurant" &&
                  (!userInfo || (userInfo && !userInfo.isAdmin))
                ) {
                  return null;
                } else {
                  return (
                    <Link href={page.path} key={page.name}>
                      <Button
                        sx={{
                          my: 2,
                          color: `${
                            isActive(page.path) ? colors["main-green"] : "black"
                          }`,
                          fontWeight: `${isActive(page.path) ? "bold" : ""}`,
                          display: "block",
                          "&:hover": {
                            color: `${colors["main-green"]}`,
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        {page.name}
                      </Button>
                    </Link>
                  );
                }
              })}
            </Box>
          </Box>

          {/* section 2 */}
          {loading ? (
            <div></div>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {/* card icon */}
              <Link href={"/cart"}>
                <IconButton size="large" sx={{ marginRight: "10px" }}>
                  <Badge badgeContent={cartItemsCount} color="error">
                    <LocalGroceryStoreOutlinedIcon />
                  </Badge>
                </IconButton>
              </Link>

              {/* user profile */}
              {userInfo && (
                <Link
                  href={"/profile"}
                  className="flex justify-end items-center"
                >
                  {/* sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }} */}

                  <IconButton sx={{ p: 0, marginRight: "7px" }}>
                    <Avatar
                      alt={userInfo.firstName}
                      src={userInfo.avatar || placeholderImage}
                    />
                  </IconButton>
                  <Typography>{`Hello, ${userInfo.firstName}`}</Typography>
                </Link>
              )}
              {!userInfo && (
                <Link href="/login">
                  <Btn text={"LOGIN"} />
                </Link>
              )}
            </Box>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
