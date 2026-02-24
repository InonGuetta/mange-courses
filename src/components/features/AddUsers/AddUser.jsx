import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
} from "@mui/material";

import {
  createUser,
  updateUser,
} from "../../../store/slicesAndThunks/usersSlice/usersSlice.js";

import ContentFieldsAddUser from "./ContentFieldsAddUser.jsx";
import DialogTitle from "../Dialogs/DialogTitle.jsx";
import DialogActions from "../Dialogs/DialogActions.jsx";

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
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        passwordHash: "",
        role: user?.role || "",
      });
    }
  }, [user, isOpen]);

  const handleInputChange = ({ target: { name, value } }) => {
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
        if (formData.passwordHash) updates.passwordHash = formData.passwordHash;
        await dispatch(updateUser({ id: user.id, updates })).unwrap();
      } else {
        await dispatch(createUser(formData)).unwrap();
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        handleCloseDialog();
      }, 700);
    } catch (err) {
      setErrorMessage(
        err?.message ||
          err ||
          `Failed to ${isEditMode ? "update" : "create"} user`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setFormData({ name: "", email: "", passwordHash: "", role: "" });
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
          boxShadow: `0 8px 32px 0 rgba(249, 115, 22, 0.25)`,
        },
      }}
    >
      <DialogTitle onClose={handleCloseDialog} colorVariant="orange">
        {isEditMode ? "Edit User" : "Add New User"}
      </DialogTitle>

      <form onSubmit={handleFormSubmit}>
        <ContentFieldsAddUser
          formData={formData}
          errorMessage={errorMessage}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isEditMode={isEditMode}
          onInputChange={handleInputChange}
        ></ContentFieldsAddUser>

        <DialogActions
          onCancel={handleCloseDialog}
          confirmText={isEditMode ? "Update User" : "Create User"}
          isLoading={isLoading}
          isConfirmDisabled={!isFormValid}
          confirmSx={{
            bgcolor: ORANGE_COLOR,
            "&:hover": { bgcolor: ORANGE_HOVER },
          }}
        />
      </form>
    </Dialog>
  );
};

export default UserFormDialog;
