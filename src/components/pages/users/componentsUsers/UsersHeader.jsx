import { Box, Typography, IconButton, Paper } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import { floatingBarSx, refreshButtonSx, pageTitleSx } from "../../../../styles/sharedGeneralStyles";
import { addUserButtonSx } from "../../../../styles/usersSpecificStyles";
import { useFloatingOnScroll } from "../../../../hooks/useFloatingOnScroll";


const UsersHeader = ({ onRefresh, onAddUser }) => {
  const { floatingRef, titleRef, floatingContainerSx } = useFloatingOnScroll();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography ref={titleRef} variant="h4" component="h1" sx={pageTitleSx}>
        Users
      </Typography>
      <Box ref={floatingRef} sx={floatingContainerSx}>
        <Paper elevation={8} sx={{ ...floatingBarSx, pointerEvents: "auto" }}>
          <IconButton onClick={onRefresh} sx={refreshButtonSx}>
            <RefreshIcon sx={{ fontSize: 32 }} />
          </IconButton>
          <IconButton onClick={onAddUser} sx={addUserButtonSx}>
            <PersonAddAltIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

export default UsersHeader;
