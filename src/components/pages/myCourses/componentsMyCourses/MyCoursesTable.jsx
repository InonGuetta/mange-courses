import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

import {
  tableContainerSx,
  tableSx,
  tableHeaderRowSx,
  tableHeaderCellSx,
  emptyRowCellSx,
} from "../../../../styles/sharedGeneralStyles";

import MyCoursesTableContent from "./MyCoursesTableContent";

const tableTitle = [
  "No .",
  "courses name",
  "course detail",
  "teacher name",
  "student name",
  "actions",
];

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
          {tableTitle.map((title, index) => (
            <TableCell key={title} sx={tableHeaderCellSx}>
              {title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
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
              (teacherId != null ? `ID: ${teacherId}` : `ID: ${courseId}`);
            const studentName =
              student?.name ??
              student?.studentName ??
              `ID: ${currentStudentId}`;
            return (
              <MyCoursesTableContent
                key={id ?? `${courseId}-${idx}`}
                item={item}
                course={course}
                courseId={courseId}
                idx={idx}
                detail={detail}
                teacherName={teacherName}
                studentName={studentName}
                onAddFavorite={onAddFavorite}
                onDeleteStudentFromCourse={onDeleteStudentFromCourse}
              ></MyCoursesTableContent>
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
