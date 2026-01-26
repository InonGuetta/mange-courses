import { Box, Typography, IconButton, Paper } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function MyCoursesHeader({ onRefresh }) {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Page Title - Centered above the floating island */}
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          fontWeight: 700,
          textAlign: "center",
          mb: 3,
          color: "#475569" // Modern slate gray
        }}
      >
        My Courses
      </Typography>

      {/* Floating Action Buttons Island */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={8}
          sx={{
            background: "linear-gradient(135deg, #64748b 0%, #475569 100%)", // Modern gradient gray-blue
            color: "white",
            py: 2,
            px: 3,
            borderRadius: "24px", // More rounded corners
            boxShadow: "0 8px 32px rgba(71, 85, 105, 0.3)",
            backdropFilter: "blur(10px)",
            width: "fit-content", // Fits exactly to button
            display: "flex",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={onRefresh}
            sx={{
              bgcolor: "rgba(96, 165, 250, 0.9)", // Modern blue
              color: "white",
              width: 64,
              height: 64,
              borderRadius: "16px",
              transition: "all 0.3s ease",
              "&:hover": { 
                bgcolor: "#3b82f6",
                transform: "translateY(-4px)",
                boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)"
              },
              "&:active": { transform: "translateY(-2px)" },
            }}
          >
            <RefreshIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
}
