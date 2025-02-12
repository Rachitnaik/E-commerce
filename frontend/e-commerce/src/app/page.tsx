'use client';

import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem } from '@mui/material';
import { Menu as MenuIcon, ShoppingCart, AccountCircle, Close } from "@mui/icons-material";
import FashionLanding from './landing/landingpage';
import './globals.css'; // Import the global styles

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [navMenuAnchor, setNavMenuAnchor] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>) =>
    (event: React.MouseEvent<HTMLElement>) => setter(event.currentTarget);

  const handleMenuClose = (setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>) => () => setter(null);

  return (
    <>
      <Box sx={{ backgroundColor: "black", color: "white", textAlign: "center", p: "5px 10px", fontSize: "0.875rem", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
        Sign up and get 20% off on your first order.
        <Typography component="span" sx={{ textDecoration: "underline", cursor: "pointer", ml: 1 }}>
          Sign Up Now
        </Typography>
        <IconButton sx={{ position: "absolute", right: 10, color: "white" }}>
          <Close fontSize="small" />
        </IconButton>
      </Box>

      <AppBar position="static" color="default" sx={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" component="a" href="#" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
              SHOP.CO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" onClick={handleMenuOpen(setNavMenuAnchor)} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={navMenuAnchor} open={Boolean(navMenuAnchor)} onClose={handleMenuClose(setNavMenuAnchor)} sx={{ display: { xs: 'block', md: 'none' } }} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleMenuClose(setNavMenuAnchor)}>
                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography variant="h5" component="a" href="#" sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
              SHOP.CO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button key={page} sx={{ my: 2, color: 'var(--text-color)', display: 'block' }}>
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 2 }}>
              <ShoppingCart />
              <Tooltip title="User Menu">
                <IconButton onClick={handleMenuOpen(setUserMenuAnchor)}>
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu anchorEl={userMenuAnchor} open={Boolean(userMenuAnchor)} onClose={handleMenuClose(setUserMenuAnchor)} sx={{ mt: '45px' }} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleMenuClose(setUserMenuAnchor)}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <FashionLanding />
    </>
  );
};

export default ResponsiveAppBar;
