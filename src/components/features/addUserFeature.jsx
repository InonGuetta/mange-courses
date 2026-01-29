import { useState } from "react";
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

import { createUser } from "../../api/apiUsers";

const ORANGE_COLOR = "rgba(249, 115, 22, 0.9)";
const ORANGE_HOVER = "#ea580c";

export default function AddUserDialog({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password_hash: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await createUser(formData);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        handleClose();
      }, 1500);
    } catch (err) {
      setError(err?.message || err || "Failed to create user");
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      password_hash: "",
      role: "",
    });
    setError(null);
    setSuccess(false);
    onClose();
  };

  const isFormValid =
    formData.name && formData.email && formData.password_hash && formData.role;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          Add New User
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: "#9a3412",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ pt: 3 }}>
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              User successfully added ✓
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              required
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              disabled={loading}
            />

            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              disabled={loading}
            />

            <TextField
              required
              fullWidth
              label="Password"
              name="password_hash"
              type="password"
              value={formData.password_hash}
              onChange={handleChange}
              variant="outlined"
              disabled={loading}
            />

            <FormControl fullWidth required>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                name="role"
                value={formData.role}
                label="Role"
                onChange={handleChange}
                disabled={loading}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            disabled={loading}
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
            disabled={loading || !isFormValid}
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
            sx={{
              bgcolor: ORANGE_COLOR,
              "&:hover": {
                bgcolor: ORANGE_HOVER,
              },
            }}
          >
            {loading ? "Creating..." : "Create User"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
