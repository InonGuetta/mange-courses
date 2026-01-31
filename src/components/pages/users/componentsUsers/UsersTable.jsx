import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

export default function UsersTable({ users = [] }) {
  const getRoleChip = (role) => {
    const isTeacher = role === "teacher";
    return (
      <Chip
        label={role}
        size="small"
        sx={{
          bgcolor: isTeacher ? "rgba(139, 92, 246, 0.15)" : "rgba(34, 197, 94, 0.15)",
          color: isTeacher ? "#7c3aed" : "#16a34a",
          fontWeight: 600,
          textTransform: "capitalize",
        }}
      />
    );
  };

  return (
    <TableContainer
      component={Paper}
      elevation={6}
      sx={{
        borderRadius: 4,
        boxShadow: "0 8px 32px 0 rgba(30,90,168,0.15)",
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(2px)",
      }}
    >
      <Table
        sx={{
          minWidth: 700,
          borderRadius: 4,
          overflow: "hidden",
          tableLayout: "fixed",
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              background: "linear-gradient(90deg, #e3eaf6 0%, #b6c7e3 100%)",
              boxShadow: "0 2px 8px 0 rgba(100,120,180,0.10)",
            }}
          >
            <TableCell
              sx={{
                color: "#222B45",
                fontWeight: 900,
                fontSize: 20,
                py: 2,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                border: "none",
              }}
            >
              No.
            </TableCell>
            <TableCell
              sx={{
                color: "#222B45",
                fontWeight: 900,
                fontSize: 20,
                py: 2,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                border: "none",
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                color: "#222B45",
                fontWeight: 900,
                fontSize: 20,
                py: 2,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                border: "none",
                width: "30%",
              }}
            >
              Email
            </TableCell>
            <TableCell
              sx={{
                color: "#222B45",
                fontWeight: 900,
                fontSize: 20,
                py: 2,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                border: "none",
              }}
            >
              Role
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.map((user, idx) => {
              const rowBg = idx % 2 === 0 ? "#FFFFFF" : "#F3F6FB";
              return (
                <TableRow
                  key={user.id}
                  sx={{
                    backgroundColor: rowBg,
                    transition: "background 0.2s, transform 0.15s",
                    "&:hover": {
                      backgroundColor: "#E8F0FF",
                      transform: "scale(1.012)",
                      boxShadow: "0 4px 16px 0 rgba(30,90,168,0.10)",
                    },
                    borderBottom: "2px solid #D9E2F2",
                    borderRadius: 2,
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
                  <TableCell
                    sx={{
                      py: 2,
                      color: "#1F2937",
                      fontSize: 16,
                      border: "none",
                    }}
                  >
                    {user.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      py: 2,
                      color: "#1F2937",
                      fontSize: 16,
                      border: "none",
                    }}
                  >
                    {user.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      py: 2,
                      border: "none",
                    }}
                  >
                    {getRoleChip(user.role)}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
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
}
