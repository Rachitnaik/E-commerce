"use client";
import { FC } from "react";
import { Box, Typography, Card, CardContent, Rating, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ArrowBackIos, ArrowForwardIos, Verified } from "@mui/icons-material";

interface Review {
    name: string;
    review: string;
    rating: number;
}

interface CustomerReviewsProps {
    reviews: Review[];
    title?: string;
}

const CustomerReviews: FC<CustomerReviewsProps> = ({ reviews, title = "Our Happy Customers" }) => {
    return (
        <Box textAlign="center" py={5} maxWidth="1200px" mx="auto">
            {/* Header with Navigation Buttons (Hidden on Mobile) */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    {title}
                </Typography>
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <IconButton className="prev" sx={{ mx: 1, background: "white", boxShadow: 1 }}>
                        <ArrowBackIos />
                    </IconButton>
                    <IconButton className="next" sx={{ mx: 1, background: "white", boxShadow: 1 }}>
                        <ArrowForwardIos />
                    </IconButton>
                </Box>
            </Box>

            {/* Swiper Container */}
            <Swiper
                modules={[Navigation]}
                navigation={{ nextEl: ".next", prevEl: ".prev" }}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                style={{ paddingBottom: "30px" }}
            >
                {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                        <Card sx={{ p: 3, borderRadius: 3, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)", textAlign: "left" }}>
                            <Rating value={review.rating} readOnly precision={0.5} sx={{ mb: 1 }} />
                            <Typography fontWeight="bold">
                                {review.name} <Verified sx={{ fontSize: 18, color: "green" }} />
                            </Typography>
                            <Typography variant="body2" mt={1} color="text.secondary">
                                "{review.review}"
                            </Typography>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default CustomerReviews;
