import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { fetchMyCourses } from "../../store/slicesAndThunks/myCoursesSlice";
import { selectVisibleMyCourses } from "../../store/selectors/myCoursesSelector";


export default function MyCoursesPage() {
    const dispatch = useDispatch();
    const myCourses = useSelector(selectVisibleMyCourses)

    useEffect(() => {
        dispatch(fetchMyCourses());
    }, [])
    
    const handleRefresh = () => {
        dispatch(fetchMyCourses());
    }
    return(
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                    הקורסים שלי
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
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>courses id</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>student id</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myCourses && myCourses.length > 0 ? (
                            myCourses.map((item) => {
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
                                        <TableCell>{item.course_id ?? item.courses_id ?? '-'}</TableCell>
                                        <TableCell>{item.student_id ?? '-'}</TableCell>
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