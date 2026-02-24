import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";

import DialogContent from "../Dialogs/DialogContent.jsx";

import { roles } from "../../../utilities/constant.js";

const ContentFieldsAddUser = ({
  formData,
  errorMessage,
  isLoading,
  isSuccess,
  isEditMode,
  onInputChange,
}) => {
  return (
    <DialogContent errorMessage={errorMessage}>
      {isSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          User successfully {isEditMode ? "updated" : "added"}
        </Alert>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          required
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          disabled={isLoading}
        />

        <TextField
          required
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onInputChange}
          disabled={isLoading}
        />

        <TextField
          required={!isEditMode}
          fullWidth
          label={
            isEditMode ? "Password (leave empty to keep current)" : "Password"
          }
          name="passwordHash"
          type="password"
          value={formData.passwordHash}
          onChange={onInputChange}
          disabled={isLoading}
          helperText={
            isEditMode ? "Only fill if you want to change password" : ""
          }
        />

        <FormControl fullWidth required>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            name="role"
            value={formData.role}
            label="Role"
            onChange={onInputChange}
            disabled={isLoading}
          >
            <MenuItem value={roles.student}>Student</MenuItem>
            <MenuItem value={roles.teacher}>Teacher</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </DialogContent>
  );
};

export default ContentFieldsAddUser;
