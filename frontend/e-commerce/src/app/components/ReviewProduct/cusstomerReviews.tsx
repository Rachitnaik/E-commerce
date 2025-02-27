"use client";
import { FC, useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Rating, IconButton, CircularProgress } from "@mui/material";
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

const CustomerReviews: FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch("https://e-commerce-b2tt.onrender.com/feedback");
                if (!response.ok) throw new Error("Failed to fetch reviews");

                const data = await response.json();
                if (data.feedback && Array.isArray(data.feedback)) {
                    const formattedReviews = data.feedback.map((item: any) => ({
                        name: `${item.user.firstname} ${item.user.lastname}`,
                        review: item.feedback_text,
                        rating: item.rating,
                    }));
                    setReviews(formattedReviews);
                }
            } catch (err) {
                setError("Error loading reviews. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    return (
        <Box textAlign="center" py={5} maxWidth="1200px" mx="auto">
            {/* Header with Navigation Buttons */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Our Happy Customers
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

            {/* Show Loader or Error Message */}
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
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
                                    {review.name}
                                </Typography>
                                <Typography variant="body2" mt={1} color="text.secondary">
                                    "{review.review}"
                                </Typography>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </Box>
    );
};

export default CustomerReviews;
