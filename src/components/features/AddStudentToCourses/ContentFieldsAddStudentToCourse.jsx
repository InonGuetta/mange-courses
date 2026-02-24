import { useSelector } from "react-redux";

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import DialogContent from "../Dialogs/DialogContent.jsx";

import { roles } from "../../../utilities/constant.js";
import { selectVisibleUsers } from "../../../store/selectors/usersSelectors.js";
import { useFilteredUsers } from "../../../hooks/useDataHelpers.js";

const ContentFieldsAddStudentToCourse = ({
  errorMessage,
  isLoading,
  selectedStudentId,
  setSelectedStudentId,
  course,
}) => {
  const users = useSelector(selectVisibleUsers);
  const students = useFilteredUsers(users, roles.student);

  return (
    <DialogContent errorMessage={errorMessage}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="body1" sx={{ color: "#475569" }}>
          Course: <strong>{course?.nameCourse || "N/A"}</strong>
        </Typography>

        <FormControl fullWidth required>
          <InputLabel id="student-select-label">Student</InputLabel>
          <Select
            labelId="student-select-label"
            id="student-select"
            value={selectedStudentId}
            label={roles.student}
            onChange={({ target: { value } }) => setSelectedStudentId(value)}
            disabled={isLoading}
          >
            {students.length > 0 ? (
              students.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No students available</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
    </DialogContent>
  );
};


export default ContentFieldsAddStudentToCourse;