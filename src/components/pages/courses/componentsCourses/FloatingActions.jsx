import { useRef, useEffect, useState } from "react";

import { Box, IconButton, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

import { floatingBarSx, refreshButtonSx, addButtonSx, pageTitleSx } from "../../../../styles/sharedStyles";


const NAVBAR_HEIGHT = 64;

const FloatingActions = ({ onAdd, onRefresh }) => {
  const [isFixed, setIsFixed] = useState(false);
  const floatingRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!floatingRef.current || !titleRef.current) return;
      const titleBottom = titleRef.current.getBoundingClientRect().bottom + window.scrollY;
      setIsFixed(window.scrollY > titleBottom - NAVBAR_HEIGHT - 16);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography ref={titleRef} variant="h4" component="h1" sx={pageTitleSx}>
        All Courses
      </Typography>
      <Box
        ref={floatingRef}
        sx={{
          display: "flex",
          justifyContent: "center",
          position: isFixed ? "fixed" : "static",
          top: isFixed ? `${NAVBAR_HEIGHT + 16}px` : undefined,
          left: isFixed ? 0 : undefined,
          width: isFixed ? "100vw" : undefined,
          zIndex: isFixed ? 1202 : undefined,
          pointerEvents: "none",
        }}
      >
        <Paper elevation={8} sx={{ ...floatingBarSx, pointerEvents: "auto" }}>
          <IconButton onClick={onRefresh} sx={refreshButtonSx}>
            <RefreshIcon sx={{ fontSize: 32 }} />
          </IconButton>
          <IconButton onClick={onAdd} sx={addButtonSx}>
            <AddIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

export default FloatingActions;
