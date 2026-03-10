import { TableCell, Tooltip, IconButton } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const ContentFieldsShowStudentRefactoring  = ({
  id,
  name,
  email,
  onDelete
}) => {
  return (
    <TableRow
      key={id || idx}
      sx={{
        backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F3F6FB",
        "&:hover": { backgroundColor: "#E8F0FF" },
      }}
    >
      <TableCell
        component="th"
        scope="row"
        sx={{
          py: 2,
          fontWeight: 600,
          color: "#1F2937",
          fontSize: 16,
          border: "none",
        }}
      >
        {idx + 1}
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>
        <Tooltip title="Delete student">
          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(student)}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};


export default ContentFieldsShowStudentRefactoring;