import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const ConfirmingDeletionDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  itemName,
  message,
  confirmButtonText = "Delete",
}) => {
  const defaultMessage = itemName
    ? `Are you sure you want to delete "${itemName}"?`
    : "Are you sure you want to delete this item?";

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message || defaultMessage}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmingDeletionDialog;