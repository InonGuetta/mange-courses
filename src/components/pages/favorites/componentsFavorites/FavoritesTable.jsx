import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, IconButton, Tooltip
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import {
  tableContainerSx, tableSx, tableHeaderRowSx, tableHeaderCellSx,
  tableBodyCellSx, tableFirstCellSx, tableWrapCellSx, getTableRowSx, emptyRowCellSx,
} from "../../../../styles/sharedStyles";


const headerCellCentered = { ...tableHeaderCellSx, textAlign: 'center' };
const bodyCellCentered = { ...tableBodyCellSx, textAlign: 'center' };

const FavoritesTable = ({ favorites = [], coursesById, usersById, onDelete }) => (
  <TableContainer component={Paper} elevation={6} sx={tableContainerSx}>
    <Table sx={tableSx}>
      <TableHead>
        <TableRow sx={tableHeaderRowSx}>
          <TableCell sx={headerCellCentered}>No.</TableCell>
          <TableCell sx={headerCellCentered}>User</TableCell>
          <TableCell sx={headerCellCentered}>Course Name</TableCell>
          <TableCell sx={{ ...headerCellCentered, width: '30%' }}>Details</TableCell>
          <TableCell sx={headerCellCentered}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {favorites.length > 0 ? favorites.map((item, idx) => {
          const course = coursesById?.get(String(item.course_id));
          const user = usersById?.get(String(item.user_id));
          return (
            <TableRow key={item.id} sx={getTableRowSx(idx)}>
              <TableCell component="th" scope="row" sx={{ ...tableFirstCellSx, textAlign: 'center' }}>{idx + 1}</TableCell>
              <TableCell sx={bodyCellCentered}>{user?.name ?? item.user_id}</TableCell>
              <TableCell sx={bodyCellCentered}>{course?.name_course ?? item.course_id}</TableCell>
              <TableCell sx={{ ...tableWrapCellSx, textAlign: 'center' }}>{course?.detail ?? '-'}</TableCell>
              <TableCell sx={{ ...tableBodyCellSx, display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Tooltip title="Remove from favorites">
                  <IconButton color="error" onClick={() => onDelete(item)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          );
        }) : (
          <TableRow>
            <TableCell colSpan={5} align="center" sx={emptyRowCellSx}>
              <Typography variant="body1" color="text.secondary">No favorites found</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default FavoritesTable;
