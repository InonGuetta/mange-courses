import { IconButton, Tooltip, TableRow, TableCell } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import {
  tableFirstCellSx,
  tableWrapCellSx,
  tableActionsCellSx,
  getTableRowSx,
} from "../../../../styles/sharedGeneralStyles";

export const CoursesTableContent = ({
  courseName,
  detail,
  teacherName,
  idx,
  id,
  item,
  onDelete,
  onEdit,
  onShowStudents,
  onAddStudentToCourse,
}) => {
  const tableIcons = [
    { key: "courseName", element: courseName },
    { key: "detail", element: detail },
    { key: "teacherName", element: teacherName },
    {
      key: "actions",
      element: (
        <>
          <Tooltip title="Delete Course">
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete(item)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Course">
            <IconButton size="small" color="info" onClick={() => onEdit(item)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Show Students of course">
            <IconButton
              size="small"
              color="warning"
              onClick={() => onShowStudents(item)}
            >
              <SpeakerNotesIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Student to Course">
            <IconButton
              size="small"
              color="success"
              onClick={() => onAddStudentToCourse(item)}
            >
              <GroupAddIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <TableRow key={id} sx={getTableRowSx(idx)}>
      <TableCell sx={tableFirstCellSx}>{idx + 1}</TableCell>
      {tableIcons.map((item) =>
        item.key === "actions" ? (
          <TableCell key={item.key} sx={tableActionsCellSx}>
            {item.element}
          </TableCell>
        ) : (
          <TableCell key={item.key} sx={tableWrapCellSx}>
            {item.element}
          </TableCell>
        ),
      )}
    </TableRow>
  );
};

export default CoursesTableContent;
