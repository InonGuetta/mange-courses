// דרוש refactoring כאן לטבלה

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
} from "@mui/material";

import DialogContent from "../Dialogs/DialogContent.jsx";
import ContentFieldsShowStudentRefactoring from "./ContentFieldsShowStudentRefactoring.jsx";
const tableTitles = ["No .", "Name", "Email", "Action"];

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
                {tableTitles.map((title, index) => (
                  <TableCell key={index} sx={{ fontWeight: 700, fontSize: 16 }}>
                    {title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, idx) => {
                const { id, name, email } = student;
                return (                  
                  <ContentFieldsShowStudentRefactoring
                    id={id}
                    name={name}
                    email={email}
                    onDelete={onDelete}
                  ></ContentFieldsShowStudentRefactoring>
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
