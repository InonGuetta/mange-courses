import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { createUser, updateUser } from "../../store/slicesAndThunks/usersSlice";


const ORANGE_COLOR = "rgba(249, 115, 22, 0.9)";
const ORANGE_HOVER = "#ea580c";

const UserFormDialog = ({ isOpen, onClose, user = null }) => {
  const dispatch = useDispatch();
  const isEditMode = Boolean(user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    passwordHash: "",
    role: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (user) {
        setFormData({
          name: user.name || "",
          email: user.email || "",
          passwordHash: "",
          role: user.role || "",
        });
      } else {
        setFormData({
          name: "",
          email: "",
          passwordHash: "",
          role: "",
        });
      }
    }
  }, [user, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      if (isEditMode) {
        const updates = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
        };
        if (formData.passwordHash) {
          updates.passwordHash = formData.passwordHash;
        }
        await dispatch(updateUser({ id: user.id, updates })).unwrap();
      } else {
        await dispatch(createUser(formData)).unwrap();
      }
      
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        handleCloseDialog();
      }, 1500);
    } catch (err) {
      setErrorMessage(err?.message || err || `Failed to ${isEditMode ? 'update' : 'create'} user`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setFormData({
      name: "",
      email: "",
      passwordHash: "",
      role: "",
    });
    setErrorMessage(null);
    setIsSuccess(false);
    onClose();
  };

  const isFormValid = isEditMode
    ? formData.name && formData.email && formData.role
    : formData.name && formData.email && formData.passwordHash && formData.role;

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseDialog}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px 0 rgba(249, 115, 22, 0.25)",
        },
      }}
    >
      <DialogTitle
        component="div"
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(90deg, #fef3e2 0%, #fed7aa 100%)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#9a3412" }}>
          {isEditMode ? "Edit User" : "Add New User"}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            color: "#9a3412",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleFormSubmit}>
        <DialogContent dividers sx={{ pt: 3 }}>
          {isSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              User successfully {isEditMode ? "updated" : "added"} ✓
            </Alert>
          )}
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              required
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              variant="outlined"
              disabled={isLoading}
            />

            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
              disabled={isLoading}
            />

            <TextField
              required={!isEditMode}
              fullWidth
              label={isEditMode ? "Password (leave empty to keep current)" : "Password"}
              name="passwordHash"
              type="password"
              value={formData.passwordHash}
              onChange={handleInputChange}
              variant="outlined"
              disabled={isLoading}
              helperText={isEditMode ? "Only fill this if you want to change the password" : undefined}
            />

            <FormControl fullWidth required>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                name="role"
                value={formData.role}
                label="Role"
                onChange={handleInputChange}
                disabled={isLoading}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            disabled={isLoading}
            sx={{
              borderColor: ORANGE_COLOR,
              color: ORANGE_COLOR,
              "&:hover": {
                borderColor: ORANGE_HOVER,
                color: ORANGE_HOVER,
                bgcolor: "rgba(249, 115, 22, 0.04)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading || !isFormValid}
            startIcon={
              isLoading ? <CircularProgress size={20} color="inherit" /> : null
            }
            sx={{
              bgcolor: ORANGE_COLOR,
              "&:hover": {
                bgcolor: ORANGE_HOVER,
              },
            }}
          >
            {isLoading 
              ? (isEditMode ? "Updating..." : "Creating...") 
              : (isEditMode ? "Update User" : "Create User")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserFormDialog;