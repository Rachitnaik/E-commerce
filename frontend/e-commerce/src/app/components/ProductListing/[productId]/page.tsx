"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Box, Button, Typography, IconButton, Rating, Chip } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Image from "next/image";

const ProductSelected = () => {
    const { id } = useParams(); // Get product ID from URL

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("Large");
    const [selectedColor, setSelectedColor] = useState("#4A4A32");

    // Mock product data (Replace this with an API call)
    const product = {
        id,
        name: "ONE LIFE GRAPHIC T-SHIRT",
        price: 260,
        oldPrice: 300,
        discount: 40,
        rating: 4.5,
        description:
            "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
        colors: ["#4A4A32", "#253A4A", "#2E2E2E"],
        sizes: ["Small", "Medium", "Large", "X-Large"],
        images: ["/tshirt1.png", "/tshirt2.png", "/tshirt3.png", "/tshirt4.png"],
    };

    return (
        <Box maxWidth={1200} mx="auto" p={3} display="flex" flexDirection={{ xs: "column", md: "row" }}>
            {/* Left: Images */}
            <Box flex={1} display="flex" flexDirection={{ xs: "column", md: "row" }}>
                <Box display="flex" flexDirection={{ xs: "row", md: "column" }} gap={1}>
                    {product.images.map((img, idx) => (
                        <Image key={idx} src={img} alt="Product" width={60} height={60} style={{ borderRadius: 8, cursor: "pointer" }} />
                    ))}
                </Box>
                <Box mx={{ xs: 0, md: 2 }}>
                    <Image src={product.images[0]} alt="Main Product" width={400} height={400} style={{ borderRadius: 10 }} />
                </Box>
            </Box>

            {/* Right: Details */}
            <Box flex={1} px={{ xs: 0, md: 4 }}>
                <Typography variant="h5" fontWeight={700}>{product.name}</Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <Rating value={product.rating} readOnly precision={0.5} />
                    <Typography variant="body2">{product.rating}/5</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={2}>
                    <Typography variant="h6" fontWeight={700}>${product.price}</Typography>
                    <Typography variant="body1" color="grey" sx={{ textDecoration: "line-through" }}>${product.oldPrice}</Typography>
                    <Chip label={`-${product.discount}%`} color="error" size="small" />
                </Box>
                <Typography variant="body2" mt={2} color="text.secondary">{product.description}</Typography>

                {/* Color Selection */}
                <Typography mt={3} fontWeight={600}>Select Colors</Typography>
                <Box display="flex" gap={1} mt={1}>
                    {product.colors.map((color) => (
                        <Box
                            key={color}
                            width={24}
                            height={24}
                            borderRadius="50%"
                            bgcolor={color}
                            border={selectedColor === color ? "2px solid black" : "1px solid grey"}
                            onClick={() => setSelectedColor(color)}
                            sx={{ cursor: "pointer" }}
                        />
                    ))}
                </Box>

                {/* Size Selection */}
                <Typography mt={3} fontWeight={600}>Choose Size</Typography>
                <Box display="flex" gap={1} mt={1}>
                    {product.sizes.map((size) => (
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

export default ProductSelected;
