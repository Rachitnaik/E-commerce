import { Box, Container, Typography, Card } from "@mui/material";
import Image from 'next/image';
import Grid from '@mui/material/Grid';

const dressStyles = [
    { title: "Casual", image: "/casual.png" },
    { title: "Formal", image: "/formal.png" },  // Expand this
    { title: "Party", image: "/party.png" },    // Expand this
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

                {/* Grid Layout - Responsive */}
                <Grid container spacing={2} justifyContent="center">
                    {dressStyles.map((style, index) => (
                        <Grid
                            item
                            xs={12}  // Full width on extra small screens
                            sm={index === 1 || index === 2 ? 8 : 4} // Make 2nd & 3rd card wider
                            key={style.title}
                        >
                            <Card sx={{ borderRadius: 2 }}>
                                <Image
                                    src={style.image}
                                    alt={style.title}
                                    width={600} // Increase width to match expanded cards
                                    height={250}
                                    style={{ objectFit: 'cover', borderRadius: '8px', width: '100%' }}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
