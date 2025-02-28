'use client';
import React, { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem } from '@mui/material';
import { Menu as MenuIcon, ShoppingCart, AccountCircle, Close } from "@mui/icons-material";

import './globals.css';
import LoginButton from './components/Login';
import axios from "axios";
import { Product } from './utils/interfaces';

import Footer from './components/Footer';

import { ThemeProvider } from "../app/context/ThemeContext";
import Landingpage from './components/landing/landingpage';
import ProductListingSkeleton from './components/ProductListing/ProductListingSkeleton';
import ProductListing from './components/ProductListing/productlisting';
import BrowseStyle from './components/BrowseStyle';
import CustomerFeedback from './components/ReviewProduct/cusstomerFeedback';
import NavBar from './components/Navbar';


const ResponsiveAppBar = () => {

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



  return (
    <>
      <ThemeProvider>
        <NavBar />
        <Landingpage />
        {loading ? <ProductListingSkeleton title="New Arrivals" /> : <ProductListing title="New Arrivals" products={newA} />}
        {loading ? <ProductListingSkeleton title="Top Selling" /> : <ProductListing title="Top Selling" products={sortedProducts} />}
        <BrowseStyle />
        <CustomerFeedback />
        <Footer />
      </ThemeProvider>

    </>
  );
};

export default ResponsiveAppBar;
