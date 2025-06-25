import { Box, Container, Typography, Card } from "@mui/material";
import Image from 'next/image';
import Grid from "@mui/material/Grid2"; // Grid2 API

const dressStyles = [
    { title: "Casual", image: "/casual.png" },
    { title: "Formal", image: "/formal.png" },
    { title: "Party", image: "/party.png" },
    { title: "Gym", image: "/gym.png" },
];

export default function BrowseStyle() {
    return (
        <Box sx={{ backgroundColor: "var(--landing-background)", py: 4, borderRadius: 3, mx: "auto", maxWidth: 1000 }}>
            <Container>
                {/* Section Title */}
                <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography variant="h6" fontWeight="bold">
                        BROWSE BY DRESS STYLE
                    </Typography>
                </Box>

                {/* Grid Layout - Responsive with Grid2 using `size` prop */}
                <Grid container spacing={2} justifyContent="center">
                    {dressStyles.map((style, index) => (
                        <Grid
                            key={style.title}
                            size={{ xs: 12, sm: 6, md: (index === 1 || index === 2) ? 8 : 4 }}
                        >
                            <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                <Box sx={{ position: 'relative' }}>

                                    <Image
                                        src={style.image}
                                        alt={style.title}
                                        width={600}
                                        height={250}
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '250px',
                                        }}
                                    />

                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            left: 12,
                                            color: 'black',
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 1,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {style.title}
                                    </Typography>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
