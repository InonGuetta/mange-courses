import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, IconButton, Tooltip
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

export default function CoursesTable({ courses = [], users = [], onDelete, onEdit }) {
  return (
    <TableContainer
      component={Paper}
      elevation={6}
      sx={{
        borderRadius: 4,
        boxShadow: '0 8px 32px 0 rgba(30,90,168,0.15)',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(2px)'
      }}
    >
      <Table sx={{ minWidth: 700, borderRadius: 4, overflow: 'hidden', tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow
            sx={{
              background: 'linear-gradient(90deg, #e3eaf6 0%, #b6c7e3 100%)',
              boxShadow: '0 2px 8px 0 rgba(100,120,180,0.10)'
            }}
          >
            <TableCell sx={{ color: '#222B45', fontWeight: 900, fontSize: 20, py: 2, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none' }}>ID</TableCell>
            <TableCell sx={{ color: '#222B45', fontWeight: 900, fontSize: 20, py: 2, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none' }}>Course Name</TableCell>
            <TableCell sx={{ color: '#222B45', fontWeight: 900, fontSize: 20, py: 2, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none', width: '30%' }}>Details</TableCell>
            <TableCell sx={{ color: '#222B45', fontWeight: 900, fontSize: 20, py: 2, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none' }}>Teacher</TableCell>
            <TableCell sx={{ color: '#222B45', fontWeight: 900, fontSize: 20, py: 2, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.length > 0 ? (
            courses.map((item, idx) => {
              const teacher = users.find((u) => u.id === item.teacher_id);
              const teacherName = teacher ? teacher.name : `ID: ${item.teacher_id}`;
              const rowBg = idx % 2 === 0 ? '#FFFFFF' : '#F3F6FB';
              return (
                <TableRow
                  key={item.id}
                  sx={{
                    backgroundColor: rowBg,
                    transition: 'background 0.2s, transform 0.15s',
                    '&:hover': {
                      backgroundColor: '#E8F0FF',
                      transform: 'scale(1.012)',
                      boxShadow: '0 4px 16px 0 rgba(30,90,168,0.10)',
                    },
                    borderBottom: '2px solid #D9E2F2',
                    borderRadius: 2,
                  }}
                >
                  <TableCell component="th" scope="row" sx={{ py: 2, fontWeight: 600, color: '#1F2937', fontSize: 16, border: 'none' }}>{item.id}</TableCell>
                  <TableCell sx={{ py: 2, color: '#1F2937', fontSize: 16, border: 'none' }}>{item.name_course}</TableCell>
                  <TableCell sx={{ py: 2, color: '#1F2937', fontSize: 16, border: 'none', wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>{item.detail}</TableCell>
                  <TableCell sx={{ py: 2, color: '#1F2937', fontSize: 16, border: 'none' }}>{teacherName}</TableCell>
                  <TableCell sx={{ py: 2, color: '#1F2937', fontSize: 16, border: 'none', display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Tooltip title="Delete Course">
                      <IconButton size="small" color="error" onClick={() => onDelete(item)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Course">
                      <IconButton size="small" color="info" onClick={() => onEdit(item)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No courses found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}