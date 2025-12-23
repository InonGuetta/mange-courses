import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const { pathname } = useLocation();

    const value =
        pathname === "/courses" ? 0 :
            pathname === "/favorites" ? 1 :
                pathname === "/my-courses" ? 2 :
                    false;

    return <>
        <AppBar position="sticky" elevation={2}>
            <Toolbar sx={{ gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    hello world
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Tabs
                    value={value}
                    textColor="inherit"
                    indicatorColor="secondary"
                    aria-label="navbar tabs"
                >
                    <Tab label="All Courses" component={Link} to="/courses" />
                    <Tab label="Favorites" component={Link} to="/favorites" />
                    <Tab label="My Courses" component={Link} to="/my-courses" />
                </Tabs>
            </Toolbar>
        </AppBar>
    </>
}