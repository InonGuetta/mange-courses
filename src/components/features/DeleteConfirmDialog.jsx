import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
/**
 * Generic Delete Confirmation Dialog
 * @param {boolean} isOpen - Whether the dialog is open
 * @param {function} onClose - Called when dialog is closed/cancelled
 * @param {function} onConfirm - Called when delete is confirmed
 * @param {string} title - Dialog title (e.g., "Course Deletion", "User Deletion")
 * @param {string} itemName - Name of the item being deleted (optional)
 * @param {string} message - Custom message (optional, will override default)
 * @param {string} confirmButtonText - Text for confirm button (default: "Delete")
 */
const DeleteConfirmDialog = ({ 
	isOpen, 
	onClose, 
	onConfirm, 
	title = "Confirm Deletion",
	itemName,
	message,
	confirmButtonText = "Delete"
}) => {
	const defaultMessage = itemName 
		? `Are you sure you want to delete "${itemName}"?`
		: "Are you sure you want to delete this item?";

	return (
		<Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
			<DialogTitle>
				{title}
			</DialogTitle>
			<DialogContent>
				<Typography variant="body1">
					{message || defaultMessage}
				</Typography>
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

export default DeleteConfirmDialog;
