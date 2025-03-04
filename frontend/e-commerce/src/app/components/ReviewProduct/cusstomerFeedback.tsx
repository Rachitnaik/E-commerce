"use client";
import { FC, useEffect, useState } from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import ReviewCard from "./ReviewCard"; // Import reusable component
import CustomerFeedbackSkeleton from "../skeletons/customerFeedbackSkeleton";

interface CustomerFeedback {
    feedback_id: string;
    feedback_text: string;
    rating: number;
    feedback_date: string;
    user: {
        firstname: string;
        lastname: string;
    };
}

const CustomerFeedback: FC = () => {
    const [feedbacks, setFeedbacks] = useState<CustomerFeedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await fetch("https://e-commerce-b2tt.onrender.com/feedback");
                if (!response.ok) throw new Error("Failed to fetch feedback");

                const data = await response.json();
                if (data.feedback && Array.isArray(data.feedback)) {
                    setFeedbacks(data.feedback);
                }
            } catch (err) {
                setError("Error loading Feedbacks. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
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
                <CustomerFeedbackSkeleton />
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
                    {feedbacks.map((feedback) => (
                        <SwiperSlide key={feedback.feedback_id}>
                            <ReviewCard
                                review={{
                                    name: `${feedback.user.firstname} ${feedback.user.lastname}`,
                                    review: feedback.feedback_text,
                                    rating: feedback.rating,

                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </Box>
    );
};

export default CustomerFeedback;
