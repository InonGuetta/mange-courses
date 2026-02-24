import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";

import DialogContent from "../Dialogs/DialogContent.jsx";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const ContentFieldsShowStudent = ({
  errorMessage,
  isLoading,
  onDelete,
  students,
}) => {
  return (
    <DialogContent errorMessage={errorMessage} sx={{ mt: 2 }}>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : students.length > 0 ? (
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ borderRadius: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background:
                    "linear-gradient(90deg, #e3eaf6 0%, #b6c7e3 100%)",
                }}
              >
                <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>
                  No .
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, idx) => {
                const { id, name, email } = student;

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
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ py: 2, textAlign: "center" }}
        >
          No students enrolled in this course
        </Typography>
      )}
    </DialogContent>
  );
};