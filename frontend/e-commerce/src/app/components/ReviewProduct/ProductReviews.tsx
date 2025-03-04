import { FC } from "react";
import { Box, Typography, Grid, Grid2, Button } from "@mui/material";
import ReviewCard from "./ReviewCard"; // Reusing ReviewCard
import { ProductReview } from "@/app/utils/interfaces";



interface ProductReviewsProps {
    reviews: ProductReview[];
}

const ProductReviews: FC<ProductReviewsProps> = ({ reviews }) => {
    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                All Reviews ({reviews.length})
            </Typography>
            <Grid2 container spacing={2}>
                {reviews.map((review) => (
                    <Grid2 size={{ xs: 12, sm: 6 }} key={review.review_id}>
                        <ReviewCard
                            review={{
                                name: `${review.user.firstname} ${review.user.lastname}`,
                                review: review.review_text,
                                rating: review.rating,
                            }}
                        />
                    </Grid2>
                ))}
            </Grid2>
            <Box textAlign="center" mt={3}>
                <Button variant="outlined">Load More Reviews</Button>
            </Box>
        </Box>
    );
};

export default ProductReviews;
