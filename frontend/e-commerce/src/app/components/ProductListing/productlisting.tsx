"use client";

import { Box, Typography, Button, Card, CardContent, CardMedia, Rating, useMediaQuery } from "@mui/material";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    rating: number;
    discount?: number;
}

interface ProductListingProps {
    title: string;
    products: Product[];
}

const ProductListing: FC<ProductListingProps> = ({ title, products }) => {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <Box textAlign="center" py={4}>
            <Typography variant="h4" fontWeight="bold" mb={3}>
                {title}
            </Typography>

            {isMobile ? (
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    loop={true}
                    speed={1200}
                    slidesPerView={1}
                    spaceBetween={10}
                >
                    {products.map((product, index) => (
                        <SwiperSlide key={product.id}>
                            <Card
                                sx={{
                                    maxWidth: 200,
                                    p: 2,
                                    borderRadius: 3,
                                    boxShadow: index === 1 ? "0px 0px 5px 3px blue" : "none",
                                    backgroundColor: "#f7f7f7",
                                    margin: "0 auto",
                                }}
                            >
                                <CardMedia component="img" height="150" image={product.image} alt={product.name} />
                                <CardContent>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {product.name}
                                    </Typography>
                                    <Rating value={product.rating} precision={0.5} readOnly size="small" />
                                    <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
                                        <Typography variant="h6" fontWeight="bold">
                                            ${product.price}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
                    {products.map((product, index) => (
                        <Card
                            key={product.id}
                            sx={{
                                maxWidth: 200,
                                p: 2,
                                borderRadius: 3,
                                boxShadow: index === 1 ? "0px 0px 5px 3px blue" : "none",
                                backgroundColor: "#f7f7f7",
                            }}
                        >
                            <CardMedia component="img" height="150" image={product.image} alt={product.name} />
                            <CardContent>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {product.name}
                                </Typography>
                                <Rating value={product.rating} precision={0.5} readOnly size="small" />
                                <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
                                    <Typography variant="h6" fontWeight="bold">
                                        ${product.price}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}

            <Button variant="outlined" sx={{ mt: 3, borderRadius: 20, px: 4 }}>
                View All
            </Button>
        </Box>
    );
};

export default ProductListing;
