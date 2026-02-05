// MyCourses page specific styles

export const selectFormControlSx = {
  minWidth: 200,
  bgcolor: 'rgba(255,255,255,0.15)',
  borderRadius: '12px',
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
    '&.Mui-focused fieldset': { borderColor: 'white' },
  },
  '& .MuiSelect-icon': { color: 'white' },
};
