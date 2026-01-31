import {
  Box,
  Typography,
  IconButton,
  Paper,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function MyCoursesHeader({
  onRefresh,
  students,
  selectedStudentId,
  onStudentChange,
}) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 3,
          color: "#475569",
        }}
      >
        My Courses
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={8}
          sx={{
            background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
            color: "white",
            py: 2,
            px: 3,
            borderRadius: "24px",
            boxShadow: "0 8px 32px rgba(71, 85, 105, 0.3)",
            backdropFilter: "blur(10px)",
            width: "fit-content",
            display: "flex",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          <FormControl
            size="small"
            sx={{
              minWidth: 200,
              bgcolor: "rgba(255,255,255,0.15)",
              borderRadius: "12px",
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
              "& .MuiSelect-icon": { color: "white" },
            }}
          >
            <Select
              value={selectedStudentId || ""}
              onChange={({ target: { value } }) => onStudentChange(value)}
              displayEmpty
              sx={{ borderRadius: "12px" }}
            >
              <MenuItem value="" disabled>
                Select Student
              </MenuItem>
              {students?.map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  {student.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton
            onClick={onRefresh}
            sx={{
              bgcolor: "rgba(96, 165, 250, 0.9)",
              color: "white",
              width: 64,
              height: 64,
              borderRadius: "50%",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#3b82f6",
                transform: "translateY(-4px)",
                boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)",
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
