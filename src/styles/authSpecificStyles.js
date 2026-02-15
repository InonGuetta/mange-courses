export const authContainerSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f5f5f5',
};

export const authPaperSx = {
  padding: 4,
  width: '100%',
  maxWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const authLinkSx = {
  mt: 2,
  cursor: 'pointer',
  textDecoration: 'underline',
  color: 'primary.main',
  '&:hover': { color: 'primary.dark' },
};

export const roleToggleContainerSx = {
  display: 'flex',
  gap: 1,
  mt: 2,
  width: '100%',
};

export const roleButtonSx = (isActive) => ({
  flex: 1,
  fontWeight: isActive ? 700 : 400,
  variant: isActive ? 'contained' : 'outlined',
});
