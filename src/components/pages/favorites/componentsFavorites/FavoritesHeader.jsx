import { Box, Typography, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function FavoritesHeader({ onRefresh }) {
  return (
    <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        Favorites
      </Typography>

      <Button
        variant="contained"
        onClick={onRefresh}
        startIcon={<RefreshIcon />}
        sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
      >
        Refresh
      </Button>
    </Box>
  );
}
