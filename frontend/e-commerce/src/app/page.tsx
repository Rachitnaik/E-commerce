'use client';
import React, { useState, useEffect } from 'react';

import './globals.css';
import axios from "axios";
import { Product } from './utils/interfaces';

import Footer from './components/Footer';

import { ThemeProvider } from "../app/context/ThemeContext";
import Landingpage from './components/landing/landingpage';
import ProductListingSkeleton from './components/skeletons/ProductListingSkeleton';
import ProductListing from './components/ProductListing/productlisting';
import BrowseStyle from './components/BrowseStyle';
import CustomerFeedback from './components/ReviewProduct/cusstomerFeedback';
import NavBar from './components/Navbar';
import useProducts from './customHooks/useProduct';


const ResponsiveAppBar = () => {

  const { products, loading } = useProducts();


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
