import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";
import { fetchStudentsByCourse } from "../../store/slicesAndThunks/myCoursesSlice";

export default function ShowStudentsDialog({ open, onClose, course }) {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && course?.id) {
      setLoading(true);
      setError(null);
      dispatch(fetchStudentsByCourse(course.id))
        .unwrap()
        .then((data) => {
          setStudents(data || []);
        })
        .catch((err) => {
          setError(err?.message || err || "Failed to load students");
          setStudents([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setStudents([]);
      setError(null);
    }
  }, [open, course, dispatch]);

  const handleClose = () => {
    setStudents([]);
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ background: 'linear-gradient(90deg, #e3eaf6 0%, #b6c7e3 100%)', fontWeight: 700 }}>
        Students in Course: {course?.name_course || ""}
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" variant="body1" sx={{ py: 2 }}>
            {error}
          </Typography>
        ) : students.length > 0 ? (
          <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(90deg, #e3eaf6 0%, #b6c7e3 100%)' }}>
                  <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, idx) => (
                  <TableRow
                    key={student.id || idx}
                    sx={{
                      backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F3F6FB",
                      "&:hover": { backgroundColor: "#E8F0FF" },
                    }}
                  >
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ py: 2, textAlign: "center" }}>
            No students enrolled in this course
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
