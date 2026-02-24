import { useSelector } from "react-redux";

import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { roles } from "../../../utilities/constant.js";
import DialogContent from "../Dialogs/DialogContent.jsx";
import { selectVisibleUsers } from "../../../store/selectors/usersSelectors.js";

const ContentFieldsEditCourse = ({ formData, errorMessage, isLoading, onInputChange }) => {
  const users = useSelector(selectVisibleUsers);
  const teachers = users?.filter(({ role }) => role === roles.teacher) || [];

  return (
    <DialogContent errorMessage={errorMessage}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          required
          fullWidth
          label="Course Name"
          name="nameCourse"
          value={formData.nameCourse}
          onChange={onInputChange}
          disabled={isLoading}
        />

        <TextField
          required
          fullWidth
          label="Course Details"
          name="detail"
          value={formData.detail}
          onChange={onInputChange}
          multiline
          rows={4}
          disabled={isLoading}
        />

        <FormControl fullWidth required>
          <InputLabel id="teacher-select-label">Teacher</InputLabel>
          <Select
            labelId="teacher-select-label"
            name="teacherId"
            value={formData.teacherId}
            label={roles.teacher}
            onChange={onInputChange}
            disabled={isLoading}
          >
            {teachers.length > 0 ? (
              teachers.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No teachers available</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
    </DialogContent>
  );
};

export default ContentFieldsEditCourse;
