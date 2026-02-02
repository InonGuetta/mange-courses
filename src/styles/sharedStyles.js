// Shared table styles for consistent UI
export const tableContainerSx = {
  borderRadius: 4,
  boxShadow: '0 8px 32px 0 rgba(30,90,168,0.15)',
  background: 'rgba(255,255,255,0.95)',
  backdropFilter: 'blur(2px)',
};

export const tableHeaderRowSx = {
  background: 'linear-gradient(90deg, #e3eaf6 0%, #b6c7e3 100%)',
  boxShadow: '0 2px 8px 0 rgba(100,120,180,0.10)',
};

export const tableHeaderCellSx = {
  color: '#222B45',
  fontWeight: 900,
  fontSize: 20,
  py: 2,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  border: 'none',
};

export const tableBodyCellSx = {
  py: 2,
  color: '#1F2937',
  fontSize: 16,
  border: 'none',
};

export const getTableRowSx = (idx) => ({
  backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F3F6FB',
  transition: 'background 0.2s, transform 0.15s',
  '&:hover': {
    backgroundColor: '#E8F0FF',
    transform: 'scale(1.012)',
    boxShadow: '0 4px 16px 0 rgba(30,90,168,0.10)',
  },
  borderBottom: '2px solid #D9E2F2',
  borderRadius: 2,
});

// Floating action bar styles
export const floatingBarSx = {
  background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
  color: 'white',
  py: 2,
  px: 3,
  borderRadius: '24px',
  boxShadow: '0 8px 32px rgba(71, 85, 105, 0.3)',
  backdropFilter: 'blur(10px)',
  width: 'fit-content',
  display: 'flex',
  gap: '1.5rem',
  alignItems: 'center',
};

export const refreshButtonSx = {
  bgcolor: 'rgba(96, 165, 250, 0.9)',
  color: 'white',
  width: 64,
  height: 64,
  borderRadius: '50%',
  transition: 'all 0.3s ease',
  '&:hover': {
    bgcolor: '#3b82f6',
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
  },
  '&:active': { transform: 'translateY(-2px)' },
};

export const addButtonSx = {
  bgcolor: 'rgba(34, 197, 94, 0.9)',
  color: 'white',
  width: 64,
  height: 64,
  borderRadius: '50%',
  transition: 'all 0.3s ease',
  '&:hover': {
    bgcolor: '#16a34a',
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 20px rgba(34, 197, 94, 0.4)',
  },
  '&:active': { transform: 'translateY(-2px)' },
};

// Dialog styles
export const dialogPaperSx = {
  borderRadius: 3,
  boxShadow: '0 8px 32px 0 rgba(30,90,168,0.25)',
};

export const dialogTitleSx = {
  m: 0,
  p: 2,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'linear-gradient(90deg, #e3eaf6 0%, #b6c7e3 100%)',
};

// Page header title style
export const pageTitleSx = {
  fontWeight: 700,
  textAlign: 'center',
  mb: 3,
  color: '#475569',
};
