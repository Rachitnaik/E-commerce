import Skeleton from "@mui/material/Skeleton";
import { Box, Card, CardContent, Typography, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

interface ProductListingProps {
    title: string;

}

const ProductListingSkeleton = ({ title }: ProductListingProps) => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
    const isDesktop = useMediaQuery("(min-width: 1025px)");

    const skeletonCount = isMobile ? 4 : 4; // Adjust count for different screen sizes

    return (
        <Box textAlign="center" py={4}>
            <Typography variant="h4" fontWeight="bold" mb={3} sx={{ color: "var(--text-color)" }}>
                {title}
            </Typography>

            {isMobile ? (
                <Swiper slidesPerView={1} spaceBetween={10} loop>
                    {[...Array(skeletonCount)].map((_, index) => (
                        <SwiperSlide key={index}>
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
                                <Skeleton variant="rectangular" width={200} height={150} sx={{ borderRadius: '8px' }} />
                                <CardContent>
                                    <Skeleton width="80%" height={20} />
                                    <Skeleton width="60%" height={20} />
                                    <Skeleton width="40%" height={30} />
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
                    {[...Array(skeletonCount)].map((_, index) => (
                        <Card
                            key={index}
                            sx={{
                                maxWidth: 200,
                                p: 2,
                                borderRadius: 3,
                                boxShadow: "none",
                                backgroundColor: "#f7f7f7",
                            }}
                        >
                            <Skeleton variant="rectangular" width={200} height={150} sx={{ borderRadius: '8px' }} />
                            <CardContent>
                                <Skeleton width="80%" height={20} />
                                <Skeleton width="60%" height={20} />
                                <Skeleton width="40%" height={30} />
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}

            <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 20, mt: 3 }} />
        </Box>
    );
};

export default ProductListingSkeleton;
