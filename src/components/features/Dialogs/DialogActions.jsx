import { DialogActions, Button, CircularProgress } from "@mui/material";

const GenericDialogActions = ({
  onCancel,
  cancelText = "Cancel",
  confirmText = "Confirm",
  isLoading = false,
  isConfirmDisabled = false,
  confirmColor = "primary", 
  sx = {},
}) => {
  return (
    <DialogActions sx={{ p: 2, gap: 1, ...sx }}>
      <Button 
        onClick={onCancel} 
        variant="outlined" 
        disabled={isLoading}
        color="inherit"
      >
        {cancelText}
      </Button>
      <Button
        type="submit"
        variant="contained"
        color={confirmColor}
        disabled={isLoading || isConfirmDisabled}
        startIcon={
          isLoading ? <CircularProgress size={20} color="inherit" /> : null
        }
      >
        {isLoading ? "Processing..." : confirmText}
      </Button>
    </DialogActions>
  );
};

export default GenericDialogActions;