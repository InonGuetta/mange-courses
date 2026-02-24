import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

import { dialogPaperSx, dialogTitleSx } from "../../../styles/sharedGeneralStyles";
const NoDataDialog = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ sx: dialogPaperSx }}>
      <DialogTitle sx={dialogTitleSx}>
        <Typography variant="h6" fontWeight={700}>Search Results</Typography>
      </DialogTitle>
      <DialogContent sx={{ py: 4, px: 6, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No data found
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button 
          onClick={onClose}
          variant="contained" 
          sx={{ borderRadius: 2, px: 4 }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoDataDialog;