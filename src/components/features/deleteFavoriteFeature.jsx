import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export default function DeleteFavoriteDialog({ open, onClose, onConfirm, courseName }) {
	return (
		<Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
			<DialogTitle>
				Favorite Deletion
			</DialogTitle>
			<DialogContent>
				<Typography variant="body1">
					Are you sure you want to delete this favorite {courseName ? `"${courseName}"` : ""}?
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} variant="outlined" color="primary">
                    Cancel
				</Button>
				<Button onClick={onConfirm} variant="contained" color="error">
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
}
