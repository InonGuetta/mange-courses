import { DialogContent, Alert } from "@mui/material";

const GenericDialogContent = ({ children, errorMessage, sx = {} }) => {
  return (
    <DialogContent dividers sx={{ pt: 3, ...sx }}>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      {children}
    </DialogContent>
  );
};

export default GenericDialogContent; 