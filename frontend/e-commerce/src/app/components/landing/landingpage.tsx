import Image from 'next/image';

import { Button, Typography, Box, Container, Divider } from '@mui/material';

import Grid from '@mui/material/Grid2';
import '../../globals.css';
import Marquee from "react-fast-marquee";

export default function Landingpage() {

    return (

        <>

            <Container maxWidth="lg" sx={{ backgroundColor: "var(--landing-background)", mt: 4 }} className="landing-page">

                <Grid container spacing={4} alignItems="center">

                    {/* Left Side Content */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography variant="h3" fontWeight="bold" gutterBottom>

                            FIND CLOTHES THAT MATCH YOUR STYLE

                        </Typography>

                        <Typography variant="body1" paragraph>

                            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.

                        </Typography>

                        <Button variant="contained" size="large" sx={{ mt: 2, backgroundColor: "var(--button-color)", borderRadius: 20, width: "40%" }}>

                            Shop Now

                        </Button>

                        <Box display="flex" justifyContent={{ xs: 'center', md: 'flex-start' }} gap={4} mt={4}>

                            <Box textAlign="center">

                                <Typography variant="h5" fontWeight="bold">200+</Typography>

                                <Typography >International Brands</Typography>

                            </Box>

                            <Box textAlign="center">

                                <Typography variant="h5" fontWeight="bold">2,000+</Typography>

                                <Typography >High-Quality Products</Typography>

                            </Box>

                            <Box textAlign="center">

                                <Typography variant="h5" fontWeight="bold">30,000+</Typography>

                                <Typography >Happy Customers</Typography>

                            </Box>

                        </Box>

                    </Grid>



                    {/* Right Side Image */}

                    <Grid size={{ xs: 12, md: 6 }} display="flex" justifyContent="center">
                        <Image src="/bannerImgbg.png" alt="Fashion Models" width={430} height={500} />
                    </Grid>
                </Grid>
                {/* Brand Logos */}

            </Container >
            <Divider sx={{ my: 6 }} />

            <Box sx={{ backgroundColor: "black", py: 2 }}>
                <Marquee speed={180} autoFill pauseOnClick pauseOnHover>
                    {['Versace', 'Zara', 'Gucci', 'Prada', 'Calvin Klein'].map((brand) => (
                        <Typography
                            key={brand}
                            variant="h4"
                            fontWeight="bold"
                            color="white"
                            textTransform="uppercase"
                            sx={{ mx: 4 }} // Ensures spacing between words
                        >
                            {brand}
                        </Typography>
                    ))}
                </Marquee>
            </Box>

        </>


    );

}

