import { Box, Typography, IconButton, Paper } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import { floatingBarSx, refreshButtonSx, pageTitleSx } from "../../../../styles/sharedGeneralStyles";
import { useFloatingOnScroll } from "../../../../hooks/useFloatingOnScroll";


const FavoritesHeader = ({ onRefresh }) => {
  const { floatingRef, titleRef, floatingContainerSx, placeholderSx } = useFloatingOnScroll();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography ref={titleRef} variant="h4" component="h1" sx={pageTitleSx}>
        Favorites
      </Typography>
      <Box ref={floatingRef} sx={floatingContainerSx}>
        <Paper elevation={8} sx={{ ...floatingBarSx, pointerEvents: "auto" }}>
          <IconButton onClick={onRefresh} sx={refreshButtonSx}>
            <RefreshIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Paper>
      </Box>
      <Box sx={placeholderSx} />
    </Box>
  );
};

export default FavoritesHeader;
