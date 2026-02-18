import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ClearIcon from "@mui/icons-material/Clear";

import {
  tableContainerSx,
  tableSx,
  tableHeaderRowSx,
  tableHeaderCellSx,
  tableBodyCellSx,
  tableFirstCellSx,
  getTableRowSx,
  emptyRowCellSx,
} from "../../../../styles/sharedGeneralStyles";

const MyCoursesTable = ({
  myCourses = [],
  coursesById,
  usersById,
  currentStudentId,
  onAddFavorite,
  onDeleteStudentFromCourse,
}) => (
  <TableContainer component={Paper} elevation={6} sx={tableContainerSx}>
    <Table sx={tableSx}>
      <TableHead>
        <TableRow sx={tableHeaderRowSx}>
          <TableCell sx={tableHeaderCellSx}>No.</TableCell>
          <TableCell sx={tableHeaderCellSx}>courses name</TableCell>
          <TableCell sx={tableHeaderCellSx}>course detail</TableCell>
          <TableCell sx={tableHeaderCellSx}>teacher name</TableCell>
          <TableCell sx={tableHeaderCellSx}>student name</TableCell>
          <TableCell sx={tableHeaderCellSx}>actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {/* אני לא משנה את כל השמות כאן כי יכול להיות התנגשות של שמות ב מילה detail */}
        {myCourses?.length > 0 ? (
          myCourses.map((item, idx) => {
            const { id, courseId, detail } = item;
            const course = coursesById?.get(String(courseId));
            const teacherId = course?.teacherId;
            const teacher =
              teacherId != null ? usersById?.get(String(teacherId)) : null;
            const student =
              currentStudentId != null
                ? usersById?.get(String(currentStudentId))
                : null;
            const teacherName =
              teacher?.name ??
              teacher?.teacherName ??
              (teacherId != null
                ? `ID: ${teacherId}`
                : 
                  `ID: ${courseId}`);
            const studentName =
              student?.name ??
              student?.studentName ??
              `ID: ${currentStudentId}`;
            return (
              <TableRow key={id} sx={getTableRowSx(idx)}>
                <TableCell component="th" scope="row" sx={tableFirstCellSx}>
                  {idx + 1}
                </TableCell>
                <TableCell sx={tableBodyCellSx}>
                  {course?.courseName ?? courseId}
                </TableCell>
                <TableCell sx={tableBodyCellSx}>
                  {course?.detail ?? detail ?? "-"}
                </TableCell>
                <TableCell sx={tableBodyCellSx}>{teacherName}</TableCell>
                <TableCell sx={tableBodyCellSx}>{studentName}</TableCell>
                <TableCell
                  sx={{ ...tableBodyCellSx, color: "#4d2af9" }}
                  align="center"
                >
                  <Tooltip title="Add to favorites">
                    <IconButton
                      onClick={() => onDeleteStudentFromCourse(item)}
                      sx={{ color: "red" }}
                    >
                      <ClearIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => onAddFavorite(item)}
                      sx={{ color: "#4d2af9" }}
                    >
                      <ThumbUpOffAltIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={6} align="center" sx={emptyRowCellSx}>
              <Typography variant="body1" color="text.secondary">
                courses not found
              </Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default MyCoursesTable;
