import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, IconButton, Tooltip,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import {
  tableContainerSx, tableSx, tableHeaderRowSx, tableHeaderCellSx,
  tableBodyCellSx, tableFirstCellSx, tableWrapCellSx, tableActionsCellSx,
  getTableRowSx, emptyRowCellSx,
} from "../../../../styles/sharedGeneralStyles";


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
          <TableCell sx={tableHeaderCellSx}>No.</TableCell>
          <TableCell sx={tableHeaderCellSx}>Course Name</TableCell>
          <TableCell sx={{ ...tableHeaderCellSx, width: '30%' }}>Details</TableCell>
          <TableCell sx={tableHeaderCellSx}>Teacher</TableCell>
          <TableCell sx={tableHeaderCellSx}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {courses.length > 0 ? (
          courses.map((item, idx) => {
            const teacher = users.find((u) => u.id === item.teacher_id);
            const teacherName = teacher ? teacher.name : `ID: ${item.teacher_id}`;
            return (
              <TableRow key={item.id} sx={getTableRowSx(idx)}>
                <TableCell component="th" scope="row" sx={tableFirstCellSx}>{idx + 1}</TableCell>
                <TableCell sx={tableBodyCellSx}>{item.name_course}</TableCell>
                <TableCell sx={tableWrapCellSx}>{item.detail}</TableCell>
                <TableCell sx={tableBodyCellSx}>{teacherName}</TableCell>
                <TableCell sx={tableActionsCellSx}>
                  <Tooltip title="Delete Course">
                    <IconButton size="small" color="error" onClick={() => onDelete(item)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Course">
                    <IconButton size="small" color="info" onClick={() => onEdit(item)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Show Students of course">
                    <IconButton size="small" color="warning" onClick={() => onShowStudents(item)}>
                      <SpeakerNotesIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add Student to Course">
                    <IconButton size="small" color="success" onClick={() => onAddStudentToCourse(item)}>
                      <GroupAddIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={5} align="center" sx={emptyRowCellSx}>
              <Typography variant="body1" color="text.secondary">No courses found</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default CoursesTable;
