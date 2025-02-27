"use client";

import { useState } from "react";
import { Box, Button, Typography, IconButton, Rating } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Image from "next/image";

const ProductDetails = ({ product }: { product: any }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
    const [selectedColor, setSelectedColor] = useState(product.features?.[0]?.color || "");
    const [selectedImage, setSelectedImage] = useState(
        product.features?.find((f: any) => f.isDefault)?.image || product.features?.[0]?.image || "/placeholder.png"
    );

    return (
        <Box maxWidth={1200} mx="auto" p={3} display="flex" flexDirection={{ xs: "column", md: "row" }}>
            {/* Left: Images */}
            <Box flex={1} display="flex" flexDirection={{ xs: "column", md: "row" }}>
                <Box display="flex" flexDirection={{ xs: "row", md: "column" }} gap={1}>
                    {product.features.map((feature: any) => (
                        <Image
                            key={feature._key}
                            src={feature.image}
                            alt="Product"
                            width={60}
                            height={60}
                            style={{ borderRadius: 8, cursor: "pointer", border: selectedImage === feature.image ? "2px solid black" : "none" }}
                            onClick={() => setSelectedImage(feature.image)}
                        />
                    ))}
                </Box>
                <Box mx={{ xs: 0, md: 2 }}>
                    <Image src={selectedImage} alt="Main Product" width={400} height={400} style={{ borderRadius: 10 }} />
                </Box>
            </Box>

            {/* Right: Details */}
            <Box flex={1} px={{ xs: 0, md: 4 }}>
                <Typography variant="h5" fontWeight={700}>{product.product_name}</Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <Rating value={product.averageRating} readOnly precision={0.5} />
                    <Typography variant="body2">{product.averageRating}/5 ({product.reviewCount} Reviews)</Typography>
                </Box>
                <Typography variant="h6" fontWeight={700} mt={2}>${product.price}</Typography>
                <Typography variant="body2" mt={2} color="text.secondary">{product.description}</Typography>

                {/* Color Selection */}
                <Typography mt={3} fontWeight={600}>Select Color</Typography>
                <Box display="flex" gap={1} mt={1}>
                    {product.features?.map((feature: any) => (
                        <Box
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
                </Box>

                {/* Size Selection */}
                <Typography mt={3} fontWeight={600}>Choose Size</Typography>
                <Box display="flex" gap={1} mt={1}>
                    {product.sizes?.map((size: string) => (
                        <Button
                            key={size}
                            variant={selectedSize === size ? "contained" : "outlined"}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </Button>
                    ))}
                </Box>

                {/* Quantity and Cart Button */}
                <Box display="flex" alignItems="center" gap={2} mt={4}>
                    <Box display="flex" alignItems="center" border="1px solid grey" borderRadius={5} p={1}>
                        <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}><Remove /></IconButton>
                        <Typography px={2}>{quantity}</Typography>
                        <IconButton onClick={() => setQuantity(quantity + 1)}><Add /></IconButton>
                    </Box>
                    <Button variant="contained" size="large">Add to Cart</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductDetails;
