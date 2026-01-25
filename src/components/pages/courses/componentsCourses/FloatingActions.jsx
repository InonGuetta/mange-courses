import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function FloatingActions({ onAdd, onRefresh }) {
  return (
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
      <AddIcon
        onClick={onAdd}
        sx={{
          width: 72, height: 72, color: "white", boxShadow: 6,
          borderRadius: "50%", fontSize: 48, bgcolor: "success.main",
          "&:hover": { bgcolor: "success.dark" },
        }}
      />
    </Box>
  );
}