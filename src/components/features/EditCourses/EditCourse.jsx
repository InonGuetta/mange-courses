import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
} from "@mui/material";

import { updateCourse } from "../../../store/slicesAndThunks/courseSlice/coursesSlice.js";

import DialogTitle from "../Dialogs/DialogTitle.jsx";
import ContentFieldsEditCourse from "./ContentFieldsEditCourse.jsx";
import DialogActions from "../Dialogs/DialogActions.jsx";

const EditCourseDialog = ({ isOpen, onClose, course }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    nameCourse: "",
    detail: "",
    teacherId: "",
  });

  useEffect(() => {
    if (course && isOpen) {
      setFormData({
        nameCourse: course.nameCourse || "",
        detail: course.detail || "",
        teacherId: course.teacherId || "",
      });
    }
  }, [course, isOpen]);

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
      const updates = {
        nameCourse: formData.nameCourse,
        detail: formData.detail,
        teacherId: Number(formData.teacherId),
      };
      await dispatch(updateCourse({ id: course.id, updates })).unwrap();
      handleCloseDialog();
    } catch (err) {
      setErrorMessage(err?.message || err || "Failed to update course");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setFormData({ nameCourse: "", detail: "", teacherId: "" });
    setErrorMessage(null);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseDialog}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px 0 rgba(30,90,168,0.25)",
        },
      }}
    >
      <DialogTitle onClose={handleCloseDialog}>
        Edit Course
      </DialogTitle>

      <form onSubmit={handleFormSubmit}>
        <ContentFieldsEditCourse
          formData={formData}
          errorMessage={errorMessage}
          isLoading={isLoading}
          onInputChange={handleInputChange}
        >
        </ContentFieldsEditCourse>

        <DialogActions
          onCancel={handleCloseDialog}
          confirmText={isLoading ? "Updating..." : "Update Course"}
          isLoading={isLoading}
          isConfirmDisabled={!formData.teacherId}
        />
      </form>
    </Dialog>
  );
};

export default EditCourseDialog;