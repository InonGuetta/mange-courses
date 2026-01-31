import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, IconButton, Tooltip
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function FavoritesTable({ favorites = [], coursesById, usersById, onDelete }) {
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
            <TableCell sx={{ color: '#222B45', fontWeight: 900, fontSize: 20, py: 2, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none', textAlign: 'center' }}>No.</TableCell>
            <TableCell sx={{ color: '#222B45', fontWeight: 900, fontSize: 20, py: 2, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none', textAlign: 'center' }}>User</TableCell>
            <TableCell sx={{ color: '#222B45', fontWeight: 900, fontSize: 20, py: 2, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none', textAlign: 'center' }}>Course Name</TableCell>
            <TableCell sx={{ color: '#222B45', fontWeight: 900, fontSize: 20, py: 2, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none', textAlign: 'center', width: '30%' }}>Details</TableCell>
            <TableCell sx={{ color: '#222B45', fontWeight: 900, fontSize: 20, py: 2, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none', textAlign: 'center' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {favorites.length > 0 ? (
            favorites.map((item, idx) => {
              const course = coursesById?.get(String(item.course_id));
              const user = usersById?.get(String(item.user_id));
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
                  <TableCell component="th" scope="row" sx={{ py: 2, fontWeight: 600, color: '#1F2937', fontSize: 16, border: 'none', textAlign: 'center' }}>{idx + 1}</TableCell>
                  <TableCell sx={{ py: 2, color: '#1F2937', fontSize: 16, border: 'none', textAlign: 'center' }}>{user?.name ?? item.user_id}</TableCell>
                  <TableCell sx={{ py: 2, color: '#1F2937', fontSize: 16, border: 'none', textAlign: 'center' }}>{course?.name_course ?? item.course_id}</TableCell>
                  <TableCell sx={{ py: 2, color: '#1F2937', fontSize: 16, border: 'none', textAlign: 'center', wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>{course?.detail ?? '-'}</TableCell>
                  <TableCell sx={{ py: 2, color: '#1F2937', fontSize: 16, border: 'none', display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Tooltip title="Remove from favorites">
                      <IconButton color="error" onClick={() => onDelete(item)}>
                        <DeleteOutlineIcon />
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
                  No favorites found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
