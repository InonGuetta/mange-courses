import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { logout, selectCurrentUser } from "../../../store/slicesAndThunks/authSlice";


const NAVBAR_BG = "linear-gradient(135deg, #549df0, #438dd7, #3e84cb, #2664ab, #164983)";

const Navbar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const pathToTab = { "/courses": 0, "/favorites": 1, "/my-courses": 2, "/users": 3 };
  const value = pathToTab[pathname] ?? false;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={2}
        sx={{ background: NAVBAR_BG }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            MANAGE COURSES
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
            <Tab label="Users" component={Link} to="/users" />
          </Tabs>

          {currentUser && (
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)", mx: 1 }}>
              {currentUser.name}
            </Typography>
          )}

          <Button color="inherit" onClick={handleLogout} sx={{ ml: 1 }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
