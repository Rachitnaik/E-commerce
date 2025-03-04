import { FC } from "react";
import { Box, Typography, Grid, Skeleton, Button } from "@mui/material";

const ProductReviewsSkeleton: FC = () => {
    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                <Skeleton width={200} height={30} />
            </Typography>
            <Grid container spacing={2}>
                {[1, 2, 3, 4].map((index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Box p={2} boxShadow={1} borderRadius={2}>
                            <Skeleton width="60%" height={30} />
                            <Skeleton variant="rectangular" width="100%" height={100} sx={{ my: 1 }} />
                            <Skeleton width="40%" height={20} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Box textAlign="center" mt={3}>
                <Button variant="outlined" disabled>
                    <Skeleton width={150} height={40} />
                </Button>
            </Box>
        </Box>
    );
};

export default ProductReviewsSkeleton;
