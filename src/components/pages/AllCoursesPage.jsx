import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { fetchCourses } from "../../store/slicesAndThunks/coursesSlice";
import { fetchUsers } from "../../store/slicesAndThunks/usersSlice";
import { selectVisibleUsers } from "../../store/selectors/usersSelectors";
import { selectVisibleCourses } from "../../store/selectors/coursesSelectors";


export default function AllCoursePage() {
    const dispatch = useDispatch();
    const courses = useSelector(selectVisibleCourses);
    const users = useSelector(selectVisibleUsers);

    useEffect(() => {
        dispatch(fetchCourses());
        dispatch(fetchUsers());
    }, [])

    const handleRefresh = () => {
        dispatch(fetchCourses());
        dispatch(fetchUsers());
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                    All Courses
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
                    Refresh
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={2}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'primary.main' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>ID</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Course Name</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Details</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Teacher</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses && courses.length > 0 ? (
                            courses.map((item) => {
                                const teacher = users.find(user => user.id === item.teacher_id);
                                const teacherName = teacher ? teacher.name : `ID: ${item.teacher_id}`;
                                
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
                                        <TableCell>{item.name_course}</TableCell>
                                        <TableCell>{item.detail}</TableCell>
                                        <TableCell>{teacherName}</TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        No courses found
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