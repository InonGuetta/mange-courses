import { Box, IconButton, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

import { floatingBarSx, refreshButtonSx, addButtonSx, pageTitleSx } from "../../../../styles/sharedGeneralStyles";
import { useFloatingOnScroll } from "../../../../hooks/useFloatingOnScroll";


const FloatingActions = ({ onAdd, onRefresh }) => {
  const { floatingRef, titleRef, floatingContainerSx } = useFloatingOnScroll();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography ref={titleRef} variant="h4" component="h1" sx={pageTitleSx}>
        All Courses
      </Typography>
      <Box ref={floatingRef} sx={floatingContainerSx}>
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
