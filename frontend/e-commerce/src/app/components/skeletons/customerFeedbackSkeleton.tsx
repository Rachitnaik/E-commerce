"use client";
import { FC } from "react";
import { Box, Typography, IconButton, Skeleton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const CustomerFeedbackSkeleton: FC = () => {
    return (
        <Box textAlign="center" py={5} maxWidth="1200px" mx="auto">
            <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
                {[1, 2, 3].map((index) => (
                    <Box key={index} width={300} p={2} boxShadow={1} borderRadius={2}>
                        <Skeleton width="70%" height={50} />
                        <Skeleton width="80%" height={30} sx={{ my: 1 }} />
                        <Skeleton width="60%" height={20} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default CustomerFeedbackSkeleton;
