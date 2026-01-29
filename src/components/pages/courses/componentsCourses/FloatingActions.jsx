import { Box, IconButton, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

// import React, { useRef, useEffect, useState } from "react";
import { useRef, useEffect, useState } from "react";

const NAVBAR_HEIGHT = 64;

export default function FloatingActions({ onAdd, onRefresh, onAddUser }) {
  const [isFixed, setIsFixed] = useState(false);
  const floatingRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!floatingRef.current || !titleRef.current) return;
      const titleBottom =
        titleRef.current.getBoundingClientRect().bottom + window.scrollY;
      if (window.scrollY > titleBottom - NAVBAR_HEIGHT - 16) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        ref={titleRef}
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 3,
          color: "#475569",
        }}
      >
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
        <Paper
          elevation={8}
          sx={{
            background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
            color: "white",
            py: 2,
            px: 3,
            borderRadius: "24px",
            boxShadow: "0 8px 32px rgba(71, 85, 105, 0.3)",
            backdropFilter: "blur(10px)",
            width: "fit-content",
            display: "flex",
            gap: "1.5rem",
            alignItems: "center",
            pointerEvents: "auto",
          }}
        >
          <IconButton
            onClick={onRefresh}
            sx={{
              bgcolor: "rgba(96, 165, 250, 0.9)",
              color: "white",
              width: 64,
              height: 64,
              borderRadius: "50%",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#3b82f6",
                transform: "translateY(-4px)",
                boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)",
              },
              "&:active": { transform: "translateY(-2px)" },
            }}
          >
            <RefreshIcon sx={{ fontSize: 32 }} />
          </IconButton>
          <IconButton
            onClick={onAdd}
            sx={{
              bgcolor: "rgba(34, 197, 94, 0.9)",
              color: "white",
              width: 64,
              height: 64,
              borderRadius: "50%",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#16a34a",
                transform: "translateY(-4px)",
                boxShadow: "0 8px 20px rgba(34, 197, 94, 0.4)",
              },
              "&:active": { transform: "translateY(-2px)" },
            }}
          >
            <AddIcon sx={{ fontSize: 32 }} />
          </IconButton>
          <IconButton
            onClick={onAddUser}
            sx={{
              bgcolor: "rgba(249, 115, 22, 0.9)",
              color: "white",
              width: 64,
              height: 64,
              borderRadius: "50%",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#ea580c",
                transform: "translateY(-4px)",
                boxShadow: "0 8px 20px rgba(249, 115, 22, 0.4)",
              },
              "&:active": { transform: "translateY(-2px)" },
            }}
          >
            <PersonAddAltIcon sx={{ fontSize: 32 }}/>
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
}
