import { Box, Typography, IconButton, Paper, FormControl, Select, MenuItem } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import { floatingBarSx, refreshButtonSx, pageTitleSx } from "../../../../styles/sharedGeneralStyles.js";
import { selectFormControlSx } from "../../../../styles/myCoursesSpecificStyles.js";
import { useFloatingOnScroll } from "../../../../hooks/useFloatingOnScroll.js";


const MyCoursesHeader = ({ onRefresh, students, selectedStudentId, onStudentChange }) => {
  const { floatingRef, titleRef, floatingContainerSx } = useFloatingOnScroll();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography ref={titleRef} variant="h4" component="h1" sx={pageTitleSx}>
        My Courses
      </Typography>
      <Box ref={floatingRef} sx={floatingContainerSx}>
        <Paper elevation={8} sx={{ ...floatingBarSx, pointerEvents: "auto" }}>
          <FormControl size="small" sx={selectFormControlSx}>
            <Select
              value={selectedStudentId || ""}
              onChange={({ target: { value } }) => onStudentChange(value)}
              displayEmpty
              sx={{ borderRadius: "12px" }}
            >
              <MenuItem value="" disabled>Select Student</MenuItem>
              {students?.map((student) => (
                <MenuItem key={student.id} value={student.id}>{student.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={onRefresh} sx={refreshButtonSx}>
            <RefreshIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

export default MyCoursesHeader;
