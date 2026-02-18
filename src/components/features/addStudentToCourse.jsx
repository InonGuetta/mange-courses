import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { roles } from "../../utilities/constant.js";

import { addStudentToCourse } from "../../store/slicesAndThunks/myCoursesSlice.js";
import { selectVisibleUsers } from "../../store/selectors/usersSelectors.js";
import { useFilteredUsers } from "../../hooks/useDataHelpers.js";

const AddStudentToCourseDialog = ({ isOpen, onClose, course }) => {
  const dispatch = useDispatch();
  const users = useSelector(selectVisibleUsers);

  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const students = useFilteredUsers(users, roles.student);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudentId || !course?.id) {
      setErrorMessage("Please select a student");
    } else {
      setErrorMessage(null);
      setIsLoading(true);

      try {
        await dispatch(
          addStudentToCourse({
            courseId: course.id,
            studentId: selectedStudentId,
          }),
        ).unwrap();
        handleCloseDialog();
      } catch (err) {
        setErrorMessage(
          err?.message || err || "Failed to add student to course",
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCloseDialog = () => {
    setSelectedStudentId("");
    setErrorMessage(null);
    onClose();
  };

  // קוד 001
  // ולממש את שלושת הדיאלוגים הגנריים
  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseDialog}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px 0 rgba(30,90,168,0.25)",
        },
      }}
    >
      <DialogTitle
        component="div"
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(90deg, #e3eaf6 0%, #b6c7e3 100%)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Add Student to Course
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleFormSubmit}>
        <DialogContent dividers sx={{ pt: 3 }}>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="body1" sx={{ color: "#475569" }}>
              {/* nameCourse לא מיוצג ב ui */}
              Course: <strong>{course?.nameCourse || "N/A"}</strong>
            </Typography>

            <FormControl fullWidth required>
              <InputLabel id="student-select-label">Student</InputLabel>
              <Select
                labelId="student-select-label"
                id="student-select"
                value={selectedStudentId}
                label={roles.student}
                onChange={({ target: { value } }) =>
                  setSelectedStudentId(value)
                }
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

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            color="inherit"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={isLoading || !selectedStudentId}
            startIcon={
              isLoading && <CircularProgress size={20} color="inherit" />
            }
          >
            {isLoading ? "Adding..." : "Add Student"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddStudentToCourseDialog;
