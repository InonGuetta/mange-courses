import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Chip, IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

import {
  tableContainerSx, tableSx, tableHeaderRowSx, tableHeaderCellSx,
  tableBodyCellSx, tableFirstCellSx, getTableRowSx, emptyRowCellSx,
} from "../../../../styles/sharedGeneralStyles";
import { getRoleChipSx } from "../../../../styles/styleSpecificUsers/usersStyles";


const UsersTable = ({ users = [], onDeleteUser, onEditUser }) => (
  <TableContainer component={Paper} elevation={6} sx={tableContainerSx}>
    <Table sx={tableSx}>
      <TableHead>
        <TableRow sx={tableHeaderRowSx}>
          <TableCell sx={tableHeaderCellSx}>No.</TableCell>
          <TableCell sx={tableHeaderCellSx}>Name</TableCell>
          <TableCell sx={{ ...tableHeaderCellSx, width: '30%' }}>Email</TableCell>
          <TableCell sx={tableHeaderCellSx}>Role</TableCell>
          <TableCell sx={tableHeaderCellSx}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.length > 0 ? (
          users.map((user, idx) => (
            <TableRow key={user.id} sx={getTableRowSx(idx)}>
              <TableCell component="th" scope="row" sx={tableFirstCellSx}>{idx + 1}</TableCell>
              <TableCell sx={tableBodyCellSx}>{user.name}</TableCell>
              <TableCell sx={tableBodyCellSx}>{user.email}</TableCell>
              <TableCell sx={{ py: 2, border: 'none' }}>
                <Chip label={user.role} size="small" sx={getRoleChipSx(user.role === 'teacher')} />
              </TableCell>
              <TableCell sx={tableBodyCellSx}>
                <IconButton color="error" onClick={() => onDeleteUser(user)}>
                  <DeleteOutlineIcon />
                </IconButton>
                <IconButton color="info" onClick={() => onEditUser(user)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} align="center" sx={emptyRowCellSx}>
              <Typography variant="body1" color="text.secondary">No users found</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default UsersTable;
