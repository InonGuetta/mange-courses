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
  Tooltip,
  IconButton,
} from "@mui/material";
import { fetchStudentsByCourse } from "../../store/slicesAndThunks/myCoursesSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const ShowStudentsDialog = ({ isOpen, onClose, course ,onDelete}) => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

     
  useEffect(() => {
    if (isOpen && course?.id) {
      setIsLoading(true);
      setErrorMessage(null);
      dispatch(fetchStudentsByCourse(course.id))
        .unwrap()
        .then((data) => {
          setStudents(data || []);
        })
        .catch((err) => {
          setErrorMessage(err?.message || err || "Failed to load students");
          setStudents([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setStudents([]);
      setErrorMessage(null);
    }
  }, [isOpen, course, dispatch]);

  const handleCloseDialog = () => {
    setStudents([]);
    setErrorMessage(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          background: "linear-gradient(90deg, #e3eaf6 0%, #b6c7e3 100%)",
          fontWeight: 700,
        }}
      >
        Students in Course: {course?.name_course || ""}
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : errorMessage ? (
          <Typography color="error" variant="body1" sx={{ py: 2 }}>
            {errorMessage}
          </Typography>
        ) : students.length > 0 ? (
          <TableContainer
            component={Paper}
            elevation={3}
            sx={{ borderRadius: 2 }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    background:
                      "linear-gradient(90deg, #e3eaf6 0%, #b6c7e3 100%)",
                  }}
                >
                  <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>
                    No .
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>
                    Action
                  </TableCell>
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
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        py: 2,
                        fontWeight: 600,
                        color: "#1F2937",
                        fontSize: 16,
                        border: "none",
                      }}
                    >
                      {idx + 1}
                    </TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <Tooltip>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onDelete(student)}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ py: 2, textAlign: "center" }}
          >
            No students enrolled in this course
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} variant="outlined" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowStudentsDialog;
