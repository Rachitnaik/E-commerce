import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ReviewCard from "./ReviewCard"; // Ensure this component is correctly implemented

// Dummy reviews data
const reviews = [
    {
        id: 1,
        name: "Samantha D.",
        rating: 5,
        review:
            "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable...",
        date: "August 14, 2023",
    },
    {
        id: 2,
        name: "Alex M.",
        rating: 5,
        review:
            "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch...",
        date: "August 15, 2023",
    },
    {
        id: 3,
        name: "Ethan R.",
        rating: 4.5,
        review:
            "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic pattern...",
        date: "August 16, 2023",
    },
    {
        id: 4,
        name: "Olivia P.",
        rating: 5,
        review:
            "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents...",
        date: "August 17, 2023",
    },
    {
        id: 5,
        name: "Liam K.",
        rating: 5,
        review:
            "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks...",
        date: "August 18, 2023",
    },
    {
        id: 6,
        name: "Ava H.",
        rating: 4.5,
        review:
            "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details...",
        date: "August 19, 2023",
    },
    {
        id: 7,
        name: "Noah L.",
        rating: 4,
        review:
            "Great quality, but I wish there were more color options. Otherwise, a solid buy...",
        date: "August 20, 2023",
    },
    {
        id: 8,
        name: "Sophia G.",
        rating: 5,
        review:
            "Amazing t-shirt! The fit is perfect, and the material feels premium...",
        date: "August 21, 2023",
    },
    {
        id: 9,
        name: "Mason W.",
        rating: 4.5,
        review:
            "Love the design, but the delivery took longer than expected...",
        date: "August 22, 2023",
    },
];

const ProductReviews = () => {
    const [visibleReviews, setVisibleReviews] = useState(6);

    const handleLoadMore = () => {
        setVisibleReviews((prev) => prev + 3);
    };

    return (
        <Box sx={{ margin: "auto", padding: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                All Reviews ({reviews.length})
            </Typography>

            {/* Display Reviews */}
            <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={2}>
                {reviews.slice(0, visibleReviews).map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </Box>

            {/* Load More Button */}
            {visibleReviews < reviews.length && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Button variant="contained" onClick={handleLoadMore}>
                        Load More Reviews
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default ProductReviews;
