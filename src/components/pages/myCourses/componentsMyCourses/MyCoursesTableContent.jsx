import { IconButton, Tooltip, TableRow, TableCell } from "@mui/material";

import {
  tableBodyCellSx,
  tableFirstCellSx,
  getTableRowSx,
} from "../../../../styles/sharedGeneralStyles";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ClearIcon from "@mui/icons-material/Clear";

export const MyCoursesTableContent = ({
  course,
  courseId,
  item,
  idx,
  detail,
  teacherName,
  studentName,
  onAddFavorite,
  onDeleteStudentFromCourse,
}) => {
  return (
    <TableRow sx={getTableRowSx(idx)}>
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
      <TableCell sx={{ ...tableBodyCellSx, color: "#4d2af9" }} align="center">
        <Tooltip title="Remove">
          <IconButton
            onClick={() => onDeleteStudentFromCourse(item)}
            sx={{ color: "red" }}
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add to favorite">
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
};

export default MyCoursesTableContent;
