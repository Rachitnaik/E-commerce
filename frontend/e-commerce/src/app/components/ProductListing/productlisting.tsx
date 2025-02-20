"use client";
import Image from 'next/image';
import { Box, Typography, Button, Card, CardContent, Rating, useMediaQuery } from "@mui/material";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Product } from "../../utils"
import '../../globals.css';


interface ProductListingProps {
    title: string;
    products: Product[];
}

const ProductListing: FC<ProductListingProps> = ({ title, products }) => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
    const isDesktop = useMediaQuery("(min-width: 1025px)");

    // Limit the number of products for tablet and desktop screens to 4
    const displayedProducts = isMobile ? products : products.slice(0, 4);

    return (
        <Box textAlign="center" py={4}>
            <Typography variant="h4" fontWeight="bold" mb={3} sx={{ color: "var(--heading-color)" }}>
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
                    {displayedProducts.map((product, index) => {
                        const imageUrl = product.features?.find((feature) => feature.isDefault)?.image || '/file.svg';

                        return (
                            <SwiperSlide key={product.product_id}>
                                <Card
                                    sx={{
                                        maxWidth: 200,
                                        p: 2,
                                        borderRadius: 3,
                                        boxShadow: "none",
                                        backgroundColor: "#f7f7f7",
                                        margin: "0 auto",
                                    }}
                                >
                                    <Image
                                        src={imageUrl}
                                        alt={product.product_name}
                                        width={200}
                                        height={150}
                                        style={{ objectFit: 'cover', borderRadius: '8px' }}
                                    />
                                    <CardContent>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {product.product_name}
                                        </Typography>
                                        <Rating value={product.averageRating} precision={0.5} readOnly size="small" />
                                        <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
                                            <Typography variant="h6" fontWeight="bold">
                                                ${product.price}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            ) : (
                <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
                    {displayedProducts.map((product, index) => {
                        const imageUrl = product.features?.find((feature) => feature.isDefault)?.image || '/file.svg';

                        return (
                            <Card
                                key={product.product_id}
                                sx={{
                                    maxWidth: 200,
                                    p: 2,
                                    borderRadius: 3,
                                    boxShadow: "none",
                                    backgroundColor: "#f7f7f7",
                                }}
                            >
                                <Image
                                    src={imageUrl}
                                    alt={product.product_name}
                                    width={200}
                                    height={150}
                                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                                />
                                <CardContent>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {product.product_name}
                                    </Typography>
                                    <Rating value={product.averageRating} precision={0.5} readOnly size="small" />
                                    <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
                                        <Typography variant="h6" fontWeight="bold">
                                            ${product.price}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Box>
            )}

            <Button variant="outlined" sx={{ mt: 3, borderRadius: 20, px: 4 }}>
                View All
            </Button>
        </Box>
    );
};

export default ProductListing;
