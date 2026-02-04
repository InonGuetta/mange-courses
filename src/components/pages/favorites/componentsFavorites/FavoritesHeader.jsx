import { Box, Typography, IconButton, Paper } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import { floatingBarSx, refreshButtonSx, pageTitleSx } from "../../../../styles/sharedStyles";


const FavoritesHeader = ({ onRefresh }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h4" component="h1" sx={pageTitleSx}>
      Favorites
    </Typography>
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper elevation={8} sx={floatingBarSx}>
        <IconButton onClick={onRefresh} sx={refreshButtonSx}>
          <RefreshIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Paper>
    </Box>
  </Box>
);

export default FavoritesHeader;
