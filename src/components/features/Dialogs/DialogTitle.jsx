import { DialogTitle, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AppDialogTitle = ({ children, onClose, colorVariant = "blue" }) => {
  const isOrange = colorVariant === "orange";
  return (
    <DialogTitle
      component="div"
      sx={{
        m: 0,
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: isOrange 
          ? "linear-gradient(90deg, #fef3e2 0%, #fed7aa 100%)" 
          : "linear-gradient(90deg, #e3eaf6 0%, #b6c7e3 100%)",
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 700, 
          color: isOrange ? "#9a3412" : "inherit" 
        }}
      >
        {children}
      </Typography>
      {onClose && (
        <IconButton
          onClick={onClose}
          sx={{ color: isOrange ? "#9a3412" : (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </DialogTitle>
  );
};

export default AppDialogTitle;