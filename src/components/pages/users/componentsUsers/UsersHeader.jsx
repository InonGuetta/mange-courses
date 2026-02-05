import { Box, Typography, IconButton, Paper } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import { floatingBarSx, refreshButtonSx, pageTitleSx } from "../../../../styles/sharedGeneralStyles";
import { addUserButtonSx } from "../../../../styles/styleSpecificUsers/usersStyles";


const UsersHeader = ({ onRefresh, onAddUser }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h4" component="h1" sx={pageTitleSx}>
      Users
    </Typography>
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper elevation={8} sx={floatingBarSx}>
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

export default UsersHeader;
