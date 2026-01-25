import { Box, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function FavoritesHeader({ onRefresh }) {
  return (
    <>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Favorites
        </Typography>
      </Box>

      <Box
        sx={{
          position: "fixed",
          top: { xs: "auto", md: "25em" },
          right: { xs: 24, md: 64 },
          zIndex: 1201,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "1.5rem",
          cursor: "pointer",
        }}
      >
        <RefreshIcon
          onClick={onRefresh}
          sx={{
            width: 72, height: 72, color: "white", boxShadow: 6,
            borderRadius: "50%", fontSize: 48, bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        />
      </Box>
    </>
  );
}
