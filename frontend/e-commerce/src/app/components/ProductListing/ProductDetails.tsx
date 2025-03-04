"use client";

import { useState } from "react";
import { Grid, Button, Typography, IconButton, Rating } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Image from "next/image";
import ProductReviews from "../ReviewProduct/ProductReviews";

import Grid2 from "@mui/material/Grid2";
// import Layout from "../layout";
import Footer from "../Footer";
import NavBar from "../Navbar";
import { Productdetails } from "@/app/utils/interfaces";



interface ProductDetailsProps {
    product: Productdetails;
    averageRating: number;
    reviewCount: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, averageRating, reviewCount }) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedSize, setSelectedSize] = useState<string>(product.features?.[0]?.size || "");
    const [selectedColor, setSelectedColor] = useState<string>(product.features?.[0]?.color || "");
    const [selectedImage, setSelectedImage] = useState<string>(
        product.features?.find((f) => f.isDefault)?.image || product.features?.[0]?.image || "/placeholder.png"
    );

    return (
        <>
            <NavBar />
            <Grid2 container maxWidth={1200} mx="auto" p={3} spacing={4}>
                {/* Left: Image Section */}
                <Grid2 size={{ xs: 12, md: 6 }} display="flex" gap={2}>
                    {/* Thumbnail Images */}
                    <Grid2 display="flex" flexDirection={{ xs: "row", md: "column" }} gap={2}>
                        {product.features?.map((feature) => (
                            <Image
                                key={feature._key}
                                src={feature.image}
                                alt="Thumbnail"
                                width={60}
                                height={60}
                                style={{
                                    borderRadius: 8,
                                    cursor: "pointer",
                                    border: selectedImage === feature.image ? "2px solid black" : "1px solid transparent",
                                }}
                                onClick={() => setSelectedImage(feature.image)}
                            />
                        ))}
                    </Grid2>

                    {/* Main Product Image */}
                    <Grid2 mx={{ xs: 0, md: 2 }}>
                        <Image src={selectedImage} alt="Product" width={360} height={350} style={{ borderRadius: 10 }} />
                    </Grid2>
                </Grid2>

                {/* Right: Product Details */}
                <Grid2 size={{ xs: 12, md: 6 }} px={{ xs: 0, md: 4 }}>
                    <Typography variant="h5" fontWeight={800} sx={{ textTransform: "uppercase" }}>
                        {product.product_name}
                    </Typography>

                    <Grid2 display="flex" alignItems="center" gap={1} mt={1}>
                        <Rating value={averageRating} readOnly precision={0.5} />
                        <Typography variant="body2">{averageRating}/5 ({reviewCount} Reviews)</Typography>
                    </Grid2>

                    <Grid2 display="flex" alignItems="center" gap={2} mt={2}>
                        <Typography variant="h6" fontWeight={800}>${product.price}</Typography>
                        {/* {product.originalPrice && (
                            <Typography variant="body1" sx={{ textDecoration: "line-through", color: "gray" }}>
                                ${product.originalPrice}
                            </Typography>
                        )}
                        {product.discountPercentage && (
                            <Typography variant="body2" sx={{ color: "red", fontWeight: 600 }}>
                                -{product.discountPercentage}%
                            </Typography>
                        )} */}
                    </Grid2>

                    <Typography variant="body2" mt={2} color="text.secondary">
                        {product.description}
                    </Typography>

                    {product.features && product.features.length > 0 && (
                        <>
                            <Typography mt={3} fontWeight={600}>Select Colors</Typography>
                            <Grid2 display="flex" gap={1} mt={1}>
                                {product.features.map((feature) => (
                                    <Grid2
                                        key={feature.color}
                                        width={24}
                                        height={24}
                                        borderRadius="50%"
                                        bgcolor={feature.color}
                                        border={selectedColor === feature.color ? "2px solid black" : "1px solid grey"}
                                        onClick={() => {
                                            setSelectedColor(feature.color);
                                            setSelectedImage(feature.image);
                                        }}
                                        sx={{ cursor: "pointer" }}
                                    />
                                ))}
                            </Grid2>
                        </>
                    )}

                    {product.features && product.features.length > 0 && (
                        <>
                            <Typography mt={3} fontWeight={600}>Choose Size</Typography>
                            <Grid2 display="flex" gap={1} mt={1}>
                                {product.features.map((feature) => (
                                    <Button
                                        key={feature._key}
                                        variant={selectedSize === feature.size ? "contained" : "outlined"}
                                        sx={{
                                            borderRadius: "20px",
                                            textTransform: "none",
                                            padding: "6px 16px",
                                            minWidth: "60px",
                                            backgroundColor: selectedSize === feature.size ? "black" : "transparent",
                                            color: selectedSize === feature.size ? "white" : "black",
                                            borderColor: selectedSize === feature.size ? "black" : "gray",
                                            "&:hover": {
                                                backgroundColor: selectedSize === feature.size ? "#333" : "rgba(0, 0, 0, 0.1)",
                                            },
                                        }}
                                        onClick={() => setSelectedSize(feature.size)}
                                    >
                                        {feature.size}
                                    </Button>
                                ))}
                            </Grid2>
                        </>
                    )}

                    <Grid2 display="flex" alignItems="center" gap={2} mt={4}>
                        <Grid2 display="flex" alignItems="center" border="1px solid grey" borderRadius={5} p={1}>
                            <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}><Remove /></IconButton>
                            <Typography px={2}>{quantity}</Typography>
                            <IconButton onClick={() => setQuantity(quantity + 1)}><Add /></IconButton>
                        </Grid2>

                        <Button
                            variant="contained"
                            size="large"
                            sx={{ backgroundColor: "black", color: "white", padding: "10px 24px", borderRadius: "30px", "&:hover": { backgroundColor: "#333" } }}
                        >
                            Add to Cart
                        </Button>
                    </Grid2>
                </Grid2>
                <Grid2 size={12} mt={6}>
                    <ProductReviews reviews={product?.reviews} />
                </Grid2>
            </Grid2>
            <Footer />
        </>
    );
};

export default ProductDetails;
