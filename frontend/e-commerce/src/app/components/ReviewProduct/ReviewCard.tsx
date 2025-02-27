import { FC } from "react";
import { Card, Rating, Typography, Box } from "@mui/material";

interface ReviewCardProps {
    review: {
        name: string;
        review: string;
        rating: number;
        date?: string; // Optional for product reviews
    };
}

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
    return (
        <Card
            sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
                textAlign: "left"
            }}
        >
            <Rating value={review.rating || 0} readOnly precision={0.5} sx={{ mb: 1 }} />
            <Typography fontWeight="bold">{review.name}</Typography>
            {review.date && (
                <Typography variant="body2" color="text.secondary">
                    {new Date(review.date).toLocaleDateString()}
                </Typography>
            )}
            <Typography variant="body2" mt={1} color="text.secondary">
                "{review.review}"
            </Typography>
        </Card>
    );
};

export default ReviewCard;
