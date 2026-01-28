import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export default function DeleteStudentFromCourseDialog({ open, onClose, onConfirm, courseName }) {
	return (
		<Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
			<DialogTitle>
				Remove Student from Course
			</DialogTitle>
			<DialogContent>
				<Typography variant="body1">
					Are you sure you want to remove the student from this course {courseName ? `"${courseName}"` : ""}?
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} variant="outlined" color="primary">
                    Cancel
				</Button>
				<Button onClick={onConfirm} variant="contained" color="error">
					Remove
				</Button>
			</DialogActions>
		</Dialog>
	);
}
