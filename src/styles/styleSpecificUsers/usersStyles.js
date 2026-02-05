export const addUserButtonSx = {
  bgcolor: 'rgba(249, 115, 22, 0.9)',
  color: 'white',
  width: 64,
  height: 64,
  borderRadius: '50%',
  transition: 'all 0.3s ease',
  '&:hover': {
    bgcolor: '#ea580c',
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 20px rgba(249, 115, 22, 0.4)',
  },
  '&:active': { transform: 'translateY(-2px)' },
};

export const getRoleChipSx = (isTeacher) => ({
  bgcolor: isTeacher ? 'rgba(139, 92, 246, 0.15)' : 'rgba(34, 197, 94, 0.15)',
  color: isTeacher ? '#7c3aed' : '#16a34a',
  fontWeight: 600,
  textTransform: 'capitalize',
});
