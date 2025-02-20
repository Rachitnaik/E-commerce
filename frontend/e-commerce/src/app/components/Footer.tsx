import { Box, Container, Grid, Typography, TextField, Button, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, Email } from "@mui/icons-material";

export default function Footer() {
    return (
        <Box sx={{ bgcolor: "#f8f8f8", mt: 4, pt: 4 }}>
            {/* Newsletter Section */}
            <Box sx={{ bgcolor: "black", color: "white", py: 4, textAlign: "center" }}>
                <Typography variant="h5" fontWeight="bold">
                    STAY UP TO DATE ABOUT OUR LATEST OFFERS
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        justifyContent: "center",
                        mt: 2,
                        gap: 1.5,
                    }}
                >
                    <TextField
                        variant="outlined"
                        placeholder="Enter your email address"
                        fullWidth
                        InputProps={{
                            startAdornment: <Email sx={{ mr: 1, color: "gray" }} />,
                            sx: { py: 1.2, bgcolor: "white", borderRadius: 2 },
                        }}
                        sx={{
                            width: { xs: "80%", sm: "auto" },
                        }}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            bgcolor: "white",
                            color: "black",
                            px: 3,
                            fontWeight: "bold",
                            borderRadius: 2,
                            width: { xs: "80%", sm: "auto" },
                        }}
                    >
                        Subscribe to Newsletter
                    </Button>
                </Box>
            </Box>

            {/* Footer Links */}
            <Container sx={{ py: 4 }}>
                <Grid container spacing={3}>
                    {/* Brand Info */}
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" fontWeight="bold">
                            SHOP.CO
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            We have clothes that suit your style and which you’re proud to wear. From women to men.
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                            <IconButton>
                                <Facebook />
                            </IconButton>
                            <IconButton>
                                <Twitter />
                            </IconButton>
                            <IconButton>
                                <Instagram />
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* Links Sections */}
                    {[
                        { title: "COMPANY", links: ["About", "Features", "Works", "Career"] },
                        { title: "HELP", links: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"] },
                        { title: "FAQ", links: ["Account", "Manage Deliveries", "Orders", "Payments"] },
                        { title: "RESOURCES", links: ["Free eBooks", "Development Tutorial", "How-to Blog", "YouTube Playlist"] },
                    ].map((section) => (
                        <Grid item xs={6} sm={2} key={section.title}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                {section.title}
                            </Typography>
                            {section.links.map((link) => (
                                <Typography key={link} variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                                    {link}
                                </Typography>
                            ))}
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Bottom Footer */}
            <Box sx={{ textAlign: "center", py: 2, borderTop: "1px solid #ddd", bgcolor: "#f8f8f8" }}>
                <Typography variant="body2" color="textSecondary">
                    ShopCo © 2000-2025. All Rights Reserved
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <img src="/visa.png" alt="Visa" style={{ width: 40, marginRight: 8 }} />
                    <img src="/paypal.png" alt="PayPal" style={{ width: 40, marginRight: 8 }} />
                    <img src="/apple-pay.png" alt="Apple Pay" style={{ width: 40 }} />
                </Box>
            </Box>
        </Box>
    );
}
