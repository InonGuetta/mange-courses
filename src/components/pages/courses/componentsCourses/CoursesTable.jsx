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

import CoursesTableContent from "./CourseTableContent";

import {
  tableContainerSx,
  tableSx,
  tableHeaderRowSx,
  tableHeaderCellSx,
  emptyRowCellSx,
} from "../../../../styles/sharedGeneralStyles";
const tableTitle = ["No .", "Course Name", "Details", "Teacher", "Actions"];

const CoursesTable = ({
  courses = [],
  users = [],
  onDelete,
  onEdit,
  onShowStudents,
  onAddStudentToCourse,
}) => (
  <TableContainer component={Paper} elevation={6} sx={tableContainerSx}>
    <Table sx={tableSx}>
      <TableHead>
        <TableRow sx={tableHeaderRowSx}>
          {tableTitle.map((title, index) => (
            <TableCell key={index} sx={tableHeaderCellSx}>
              {title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {courses.length > 0 ? (
          courses.map((item, idx) => {
            const { id, teacherId, courseName, detail } = item;
            const teacher = users.find((u) => u.id === teacherId);
            const teacherName = teacher ? teacher.name : `ID: ${teacherId}`;

            return (
              <CoursesTableContent
                courseName={courseName}
                detail={detail}
                teacherName={teacherName}
                idx={idx}
                id={id}
                item={item}
                onDelete={onDelete}
                onEdit={onEdit}
                onShowStudents={onShowStudents}
                onAddStudentToCourse={onAddStudentToCourse}
              ></CoursesTableContent>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={5} align="center" sx={emptyRowCellSx}>
              <Typography variant="body1" color="text.secondary">
                No courses found
              </Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default CoursesTable;
