'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem } from '@mui/material';
import { Menu as MenuIcon, ShoppingCart, AccountCircle, Close } from "@mui/icons-material";
import Landingpage from '../app/components/Landing/landingpage';
import './globals.css';
import ProductListing from './components/ProductListing/productlisting';
import LoginButton from './components/Login';
import axios from "axios";
import { Product } from './utils/interfaces';
import Dress from './components/Dress';
import Footer from './components/Footer';
import CustomerReviews from './components/cusstomerReviews';
import ProductListingSkeleton from './components/ProductListing/ProductListingSkeleton';
import { ThemeProvider } from "../app/context/ThemeContext";

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const MenuList = ({ items, handleClose }: { items: string[], handleClose: () => void }) => (
  <>
    {items.map((item) => (
      <MenuItem key={item} onClick={handleClose}>
        <Typography sx={{ textAlign: 'center' }}>{item}</Typography>
      </MenuItem>
    ))}
  </>
);
const ResponsiveAppBar = () => {
  const [navMenuAnchor, setNavMenuAnchor] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://e-commerce-b2tt.onrender.com/products");
        setProducts(response.data.products);

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  const newA: Product[] = [...products].sort((x, y) => new Date(y.date).getTime() - new Date(x.date).getTime());

  const sortedProducts: Product[] = [...products].sort(
    (x, y) => y.averageRating - x.averageRating
  );


  const handleMenuToggle = (setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>) =>
    (event: React.MouseEvent<HTMLElement>) => setter(prev => (prev ? null : event.currentTarget));

  const reviews = [
    { name: "Sarah M.", review: "I'm blown away by the quality and style of the clothes I received from Shop.co.", rating: 5 },
    { name: "Alex K.", review: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co.", rating: 5 },
    { name: "James L.", review: "The selection of clothes is not only diverse but also on-point with the latest trends.", rating: 5 },
    { name: "Sarah M.", review: "I'm blown away by the quality and style of the clothes I received from Shop.co.", rating: 2.5 },
    { name: "Alex K.", review: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co.", rating: 5 },
    { name: "James L.", review: "The selection of clothes is not only diverse but also on-point with the latest trends.", rating: 5 },
    { name: "Sarah M.", review: "I'm blown away by the quality and style of the clothes I received from Shop.co.", rating: 5 },
    { name: "Alex K.", review: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co.", rating: 5 },
    { name: "James L.", review: "The selection of clothes is not only diverse but also on-point with the latest trends.", rating: 5 },
  ];



  return (
    <>
      <ThemeProvider>
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
              <Typography variant="h6" component="a" href="#" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontWeight: 700, letterSpacing: '.3rem', color: 'var(--heading-color)', textDecoration: 'none', }}>
                SHOP.CO
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton size="large" onClick={handleMenuToggle(setNavMenuAnchor)} color="inherit">
                  <MenuIcon />
                </IconButton>
                <Menu anchorEl={navMenuAnchor} open={Boolean(navMenuAnchor)} onClose={handleMenuToggle(setNavMenuAnchor)} sx={{ display: { xs: 'block', md: 'none' } }} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
                  <MenuList items={pages} handleClose={() => setNavMenuAnchor(null)} />
                </Menu>
              </Box>

              <Typography variant="h5" component="a" href="#" sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontWeight: 700, letterSpacing: '.3rem', color: 'var(--heading-color)', textDecoration: 'none' }}>
                SHOP.CO
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button key={page} sx={{ my: 2, color: 'var(--heading-color)', display: 'block' }}>
                    {page}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 2 }}>
                <ShoppingCart sx={{ color: 'var(--heading-color)' }} />
                <Tooltip title="User Menu">
                  <IconButton onClick={handleMenuToggle(setUserMenuAnchor)}>
                    <AccountCircle sx={{ color: 'var(--heading-color)' }} />
                  </IconButton>

                </Tooltip>
                <LoginButton />
                <Menu anchorEl={userMenuAnchor} open={Boolean(userMenuAnchor)} onClose={handleMenuToggle(setUserMenuAnchor)} sx={{ mt: '45px' }} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                  <MenuList items={settings} handleClose={() => setUserMenuAnchor(null)} />
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Landingpage />
        {loading ? <ProductListingSkeleton title="New Arrivals" /> : <ProductListing title="New Arrivals" products={newA} />}
        {loading ? <ProductListingSkeleton title="Top Selling" /> : <ProductListing title="Top Selling" products={sortedProducts} />}
        <Dress></Dress>
        <CustomerReviews reviews={reviews} />
        <Footer />
      </ThemeProvider>

    </>
  );
};

export default ResponsiveAppBar;
