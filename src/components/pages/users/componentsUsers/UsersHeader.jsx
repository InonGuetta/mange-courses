import { Box, Typography, IconButton, Paper } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { floatingBarSx, refreshButtonSx, pageTitleSx } from "../../../../styles/sharedStyles";

const addUserButtonSx = {
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
};

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
