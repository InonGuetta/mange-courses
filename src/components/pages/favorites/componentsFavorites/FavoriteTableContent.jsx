import { IconButton, Tooltip, TableRow, TableCell } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import {
  tableBodyCellSx,
  tableFirstCellSx,
  tableWrapCellSx,
  getTableRowSx,
} from "../../../../styles/sharedGeneralStyles";

const bodyCellCentered = { ...tableBodyCellSx, textAlign: "center" };

export const FavoriteTableContent = ({
  onDelete,
  user,
  course,
  idx,
  courseId,
  userId,
  item,
}) => {
  return (
    <TableRow key={item.id} sx={getTableRowSx(idx)}>
      <TableCell
        component="th"
        scope="row"
        sx={{ ...tableFirstCellSx, textAlign: "center" }}
      >
        {idx + 1}
      </TableCell>
      <TableCell sx={bodyCellCentered}>{user?.name ?? userId}</TableCell>
      <TableCell sx={bodyCellCentered}>
        {course?.courseName ?? courseId}
      </TableCell>
      <TableCell sx={{ ...tableWrapCellSx, textAlign: "center" }}>
        {course?.detail ?? "-"}
      </TableCell>
      <TableCell
        sx={{
          ...tableBodyCellSx,
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Tooltip title="Remove from favorites">
          <IconButton color="error" onClick={() => onDelete(item)}>
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default FavoriteTableContent;
