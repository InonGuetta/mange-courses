import { Chip, IconButton, TableRow , TableCell  } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

import {
  tableBodyCellSx,
  tableFirstCellSx,
  getTableRowSx,
} from "../../../../styles/sharedGeneralStyles";

import { roles } from "../../../../utilities/constant.js";
import { getRoleChipSx } from "../../../../styles/usersSpecificStyles";

const UsersTableContent = ({
  onDeleteUser,
  onEditUser,
  id,
  user,
  idx,
  name,
  email,
  role,
}) => {
  return (
    <TableRow key={id} sx={getTableRowSx(idx)}>
      <TableCell component="th" scope="row" sx={tableFirstCellSx}>
        {idx + 1}
      </TableCell>
      <TableCell sx={tableBodyCellSx}>{name}</TableCell>
      <TableCell sx={tableBodyCellSx}>{email}</TableCell>
      <TableCell sx={{ py: 2, border: "none" }}>
        <Chip
          label={role}
          size="small"
          sx={getRoleChipSx(role === roles.teacher)}
        />
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
  );
};

export default UsersTableContent;