import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem, Grid2 } from '@mui/material';
import { Menu as MenuIcon, ShoppingCart, AccountCircle, Close } from "@mui/icons-material";
import { useState } from 'react';
import LoginButton from './Login';






const MenuList = ({ items, handleClose }: { items: string[], handleClose: () => void }) => (
    <>
        {items.map((item) => (
            <MenuItem key={item} onClick={handleClose}>
                <Typography sx={{ textAlign: 'center' }}>{item}</Typography>
            </MenuItem>
        ))}
    </>
);


const NavBar = () => {

    const [navMenuAnchor, setNavMenuAnchor] = useState<null | HTMLElement>(null);
    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);


    const handleMenuToggle = (setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>) =>
        (event: React.MouseEvent<HTMLElement>) => setter(prev => (prev ? null : event.currentTarget));



    const pages = ['Products', 'Pricing', 'Blog'];
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    return (
        <>
            <Grid2
                container
                sx={{
                    backgroundColor: "black",
                    color: "white",
                    textAlign: "center",
                    p: "5px 10px",
                    fontSize: "0.875rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                }}
            >
                Sign up and get 20% off on your first order.
                <Typography component="span" sx={{ textDecoration: "underline", cursor: "pointer", ml: 1 }}>
                    Sign Up Now
                </Typography>

                <IconButton sx={{ position: "absolute", right: 10, color: "white" }}>
                    <Close fontSize="small" />
                </IconButton>
            </Grid2>
            <AppBar position="static" color="default" sx={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography variant="h6" component="a" href="#" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontWeight: 700, letterSpacing: '.3rem', color: 'var(--heading-color)', textDecoration: 'none', }}>
                            SHOP.CO
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton size="large" onClick={handleMenuToggle(setNavMenuAnchor)} color="inherit">
                                <MenuIcon />
                            </IconButton>
                            <Menu anchorEl={navMenuAnchor} open={Boolean(navMenuAnchor)} onClose={handleMenuToggle(setNavMenuAnchor)} sx={{ display: { xs: 'block', md: 'none' } }} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
                                <MenuList items={pages} handleClose={() => setNavMenuAnchor(null)} />
                            </Menu>
                        </Box>

                        <Typography variant="h5" component="a" href="#" sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontWeight: 700, letterSpacing: '.3rem', color: 'var(--heading-color)', textDecoration: 'none' }}>
                            SHOP.CO
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button key={page} sx={{ my: 2, color: 'var(--heading-color)', display: 'block' }}>
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 2 }}>
                            <ShoppingCart sx={{ color: 'var(--heading-color)' }} />
                            <Tooltip title="User Menu">
                                <IconButton onClick={handleMenuToggle(setUserMenuAnchor)}>
                                    <AccountCircle sx={{ color: 'var(--heading-color)' }} />
                                </IconButton>

                            </Tooltip>
                            <LoginButton />
                            <Menu anchorEl={userMenuAnchor} open={Boolean(userMenuAnchor)} onClose={handleMenuToggle(setUserMenuAnchor)} sx={{ mt: '45px' }} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                                <MenuList items={settings} handleClose={() => setUserMenuAnchor(null)} />
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>

    )
}
export default NavBar;