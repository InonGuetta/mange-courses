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

            <TableContainer component={Paper} elevation={6} sx={{ borderRadius: 4, boxShadow: '0 8px 32px 0 rgba(30,90,168,0.15)', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(2px)' }}>
                <Table sx={{ minWidth: 700, borderRadius: 4, overflow: 'hidden' }}>
                    <TableHead>
                        <TableRow sx={{
                            background: 'linear-gradient(90deg, #e3eaf6 0%, #b6c7e3 100%)',
                            boxShadow: '0 2px 8px 0 rgba(100,120,180,0.10)'
                        }}>
                            <TableCell sx={{ color: '#222B45', fontWeight: 900, fontSize: 20, py: 2, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none' }}>id</TableCell>
                            <TableCell sx={{ color: '#222B45', fontWeight: 900, fontSize: 20, py: 2, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none' }}>courses name</TableCell>
                            <TableCell sx={{ color: '#222B45', fontWeight: 900, fontSize: 20, py: 2, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none' }}>course detail</TableCell>
                            <TableCell sx={{ color: '#222B45', fontWeight: 900, fontSize: 20, py: 2, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none' }}>teacher name</TableCell>
                            <TableCell sx={{ color: '#222B45', fontWeight: 900, fontSize: 20, py: 2, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none' }}>student name</TableCell>
                            <TableCell sx={{ color: '#222B45', fontWeight: 900, fontSize: 20, py: 2, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none' }}>add favorite</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myCourses && myCourses.length > 0 ? (
                            myCourses.map((item, idx) => {
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
                                            backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F3F6FB',
                                            transition: 'background 0.2s, transform 0.15s',
                                            '&:hover': {
                                                backgroundColor: '#E8F0FF',
                                                transform: 'scale(1.012)',
                                                boxShadow: '0 4px 16px 0 rgba(30,90,168,0.10)',
                                            },
                                            borderBottom: '2px solid #D9E2F2',
                                            borderRadius: 2,
                                        }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ py: 2, fontWeight: 600, color: '#1F2937', fontSize: 16, border: 'none' }}>{item.id}</TableCell>
                                        <TableCell sx={{ py: 2, color: '#1F2937', fontSize: 16, border: 'none' }}>{courseName}</TableCell>
                                        <TableCell sx={{ py: 2, color: '#1F2937', fontSize: 16, border: 'none' }}>{courseDetail}</TableCell>
                                        <TableCell sx={{ py: 2, color: '#1F2937', fontSize: 16, border: 'none' }}>{teacherName}</TableCell>
                                        <TableCell sx={{ py: 2, color: '#1F2937', fontSize: 16, border: 'none' }}>{studentName}</TableCell>
                                        <TableCell sx={{ py: 2, color: '#1F2937', fontSize: 16, border: 'none' }}>👍</TableCell>
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