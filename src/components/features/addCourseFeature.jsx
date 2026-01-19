import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField,Box,FormControl,InputLabel,Select,MenuItem,IconButton,Typography,CircularProgress,Alert
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { createCourse } from "../../store/slicesAndThunks/coursesSlice";
import { selectVisibleUsers } from "../../store/selectors/usersSelectors";


export default function AddCourseDialog({ open, onClose }) {
    const dispatch = useDispatch();
    const users = useSelector(selectVisibleUsers);
    
    const [formData, setFormData] = useState({
        name_course: "",
        detail: "",
        teacher_id: ""
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const courseData = {
                ...formData,
                teacher_id: Number(formData.teacher_id)
            };
            await dispatch(createCourse(courseData)).unwrap();
            handleClose();
        } catch (err) {
            setError(err?.message || err || "Failed to create course");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            name_course: "",
            detail: "",
            teacher_id: ""
        });
        setError(null);
        onClose();
    };

    const teachers = users?.filter(user => user.role === "teacher") || [];

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: '0 8px 32px 0 rgba(30,90,168,0.25)',
                }
            }}
        >
            <DialogTitle 
                component="div"
                sx={{ 
                    m: 0, 
                    p: 2, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    background: 'linear-gradient(90deg, #e3eaf6 0%, #b6c7e3 100%)',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Add New Course
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent dividers sx={{ pt: 3 }}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            required
                            fullWidth
                            label="Course Name"
                            name="name_course"
                            value={formData.name_course}
                            onChange={handleChange}
                            variant="outlined"
                            disabled={loading}
                        />

                        <TextField
                            required
                            fullWidth
                            label="Course Details"
                            name="detail"
                            value={formData.detail}
                            onChange={handleChange}
                            variant="outlined"
                            multiline
                            rows={4}
                            disabled={loading}
                        />

                        <FormControl fullWidth required>
                            <InputLabel id="teacher-select-label">Teacher</InputLabel>
                            <Select
                                labelId="teacher-select-label"
                                id="teacher-select"
                                name="teacher_id"
                                value={formData.teacher_id}
                                label="Teacher"
                                onChange={handleChange}
                                disabled={loading}
                            >
                                {teachers.length > 0 ? (
                                    teachers.map((teacher) => (
                                        <MenuItem key={teacher.id} value={teacher.id}>
                                            {teacher.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>
                                        No teachers available
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button 
                        onClick={handleClose} 
                        variant="outlined"
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained"
                        disabled={loading || !formData.teacher_id}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                        sx={{
                            bgcolor: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            }
                        }}
                    >
                        {loading ? "Creating..." : "Create Course"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
