// דרוש refactoring כאן לטבלה 


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  // Chip,
  // IconButton,
} from "@mui/material";

// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import EditIcon from "@mui/icons-material/Edit";

import {
  tableContainerSx,
  tableSx, 
  tableHeaderRowSx,
  tableHeaderCellSx,
  // tableBodyCellSx, 
  // tableFirstCellSx,
  // getTableRowSx,
  emptyRowCellSx,
} from "../../../../styles/sharedGeneralStyles";

// import { roles } from "../../../../utilities/constant.js";
// import { getRoleChipSx } from "../../../../styles/usersSpecificStyles";

import UsersTableContent from "./UsersTableContent";

const tableTitle = ["No .","Name","Email","Role","Actions"];


const UsersTable = ({ 
  users = [],
   onDeleteUser, 
   onEditUser
   }) => (
  <TableContainer component={Paper} elevation={6} sx={tableContainerSx}>
    <Table sx={tableSx}>
      <TableHead>
        <TableRow sx={tableHeaderRowSx}>
          {tableTitle.map((title,index)=>( 
            <TableCell key={index} sx={tableHeaderCellSx}>
              {title }
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {users.length > 0 ? (
          users.map((user, idx) => {
            const { id, name, email, role } = user;
            return (
              // <TableRow key={id} sx={getTableRowSx(idx)}>
              //   <TableCell component="th" scope="row" sx={tableFirstCellSx}>
              //     {idx + 1}
              //   </TableCell>
              //   <TableCell sx={tableBodyCellSx}>{name}</TableCell>
              //   <TableCell sx={tableBodyCellSx}>{email}</TableCell>
              //   <TableCell sx={{ py: 2, border: "none" }}>
              //     <Chip
              //       label={role}
              //       size="small"
              //       sx={getRoleChipSx(role === roles.teacher)}
              //     />
              //   </TableCell>
              //   <TableCell sx={tableBodyCellSx}>
              //     <IconButton color="error" onClick={() => onDeleteUser(user)}>
              //       <DeleteOutlineIcon />
              //     </IconButton>
              //     <IconButton color="info" onClick={() => onEditUser(user)}>
              //       <EditIcon />
              //     </IconButton>
              //   </TableCell>
              // </TableRow>


              <UsersTableContent
                  onDeleteUser={onDeleteUser}
                  onEditUser={onEditUser}
                  id={id}
                  user={user}
                  idx={idx}
                  name={name}
                  email={email}
                  role={role}
              >
              </UsersTableContent>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={5} align="center" sx={emptyRowCellSx}>
              <Typography variant="body1" color="text.secondary">
                No users found
              </Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default UsersTable;
