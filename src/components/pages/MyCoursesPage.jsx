import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { fetchMyCourses } from "../../store/slicesAndThunks/myCoursesSlice";
import { fetchUsers } from "../../store/slicesAndThunks/usersSlice";
import { fetchCourses } from "../../store/slicesAndThunks/coursesSlice";
import { selectVisibleMyCourses } from "../../store/selectors/myCoursesSelector";
import { selectVisibleUsers } from "../../store/selectors/usersSelectors";
import { selectVisibleCourses } from "../../store/selectors/coursesSelectors";


export default function MyCoursesPage() {
    const dispatch = useDispatch();
    const myCourses = useSelector(selectVisibleMyCourses)
    const users = useSelector(selectVisibleUsers)
    const courses = useSelector(selectVisibleCourses)

    useEffect(() => {
        dispatch(fetchMyCourses());
        dispatch(fetchUsers());
        dispatch(fetchCourses());
    }, [])

    const handleRefresh = () => {
        dispatch(fetchMyCourses());
        dispatch(fetchUsers());
        dispatch(fetchCourses());
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                    My Courses
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleRefresh}
                    startIcon={<RefreshIcon />}
                    sx={{
                        bgcolor: 'primary.main',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        }
                    }}
                >
                    refresh
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={2}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'primary.main' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>id</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>courses name</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>course detail</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>teacher name</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>student name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myCourses && myCourses.length > 0 ? (
                            myCourses.map((item) => {
                                const student = users.find((u) => String(u.id) === String(item.student_id));
                                const studentName = student ? (student.name ?? student.studentName ?? `ID: ${item.student_id}`) : `ID: ${item.student_id}`;
                                const course = courses.find((c) => String(c.id) === String(item.course_id));
                                const courseName = course ? (course.name_course ?? course.courseName ?? `ID: ${item.course_id}`) : `ID: ${item.course_id}`;

                                const courseTeacherId = course ? (course.teacher_id ?? course.courseTeacher ?? `ID ${item.course_id}`) : `ID ${item.course_id}`;
                                const teacher = users.find((u) => String(u.id) === String(courseTeacherId));
                                const teacherName = teacher ? (teacher.name ?? teacher.teacherName ?? `ID: ${courseTeacherId}`) : `ID: ${courseTeacherId}`;
                                const courseDetail = course ? (course.detail ?? course.detailCourse ?? `ID ${item.detail}`) : `ID ${item.detail}`;

                                return (
                                    <TableRow
                                        key={item.id}
                                        sx={{
                                            '&:nth-of-type(odd)': {
                                                bgcolor: 'action.hover',
                                            },
                                            '&:hover': {
                                                bgcolor: 'action.selected',
                                            }
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {item.id}
                                        </TableCell>
                                        <TableCell>{courseName}</TableCell>
                                        <TableCell>{courseDetail}</TableCell>
                                        <TableCell>{teacherName}</TableCell>
                                        <TableCell>{studentName}</TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        courses not found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}