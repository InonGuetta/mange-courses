import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
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

import { createCourse } from "../../store/slicesAndThunks/coursesSlice.js";
import { selectVisibleUsers } from "../../store/selectors/usersSelectors.js";


const AddCourseDialog = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const users = useSelector(selectVisibleUsers);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    nameCourse: "",
    detail: "",
    teacherId: "",
  });
 
  // דוגמה לאיך עושים decounstruction לאירוע האזנה
  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const courseData = {
        ...formData,
        teacherId: Number(formData.teacherId),
      };
      await dispatch(createCourse(courseData)).unwrap();
      handleCloseDialog();
    } catch (err) {
      setErrorMessage(err?.message || err || "Failed to create course");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setFormData({
      nameCourse: "",
      detail: "",
      teacherId: "",
    });
    setErrorMessage(null);
    onClose();
  };

  const teachers = users?.filter(({ role }) => role === roles.teacher) || [];

  // קוד 001
  // להשתמש בקומפוננטות הגנריות של DialogTitle, DialogContent and DialogActions
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
          Add New Course
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
            <TextField
              required
              fullWidth
              label="Course Name"
              name="nameCourse"
              value={formData.nameCourse}
              onChange={handleInputChange}
              variant="outlined"
              disabled={isLoading}
            />

            <TextField
              required
              fullWidth
              label="Course Details"
              name="detail"
              value={formData.detail}
              onChange={handleInputChange}
              variant="outlined"
              multiline
              rows={4}
              disabled={isLoading}
            />

            <FormControl fullWidth required>
              <InputLabel id="teacher-select-label">Teacher</InputLabel>
              <Select
                labelId="teacher-select-label"
                id="teacher-select"
                name="teacherId"
                value={formData.teacherId}
                label={roles.teacher}
                onChange={handleInputChange}
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

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading || !formData.teacherId}
            startIcon={
              isLoading ? <CircularProgress size={20} color="inherit" /> : null
            }
            sx={{
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            {isLoading ? "Creating..." : "Create Course"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddCourseDialog;
