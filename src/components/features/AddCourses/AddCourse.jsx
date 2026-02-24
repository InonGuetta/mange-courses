import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog } from "@mui/material";

import { createCourse } from "../../../store/slicesAndThunks/courseSlice/coursesSlice.js";

import DialogTitle from "../Dialogs/DialogTitle.jsx";
import DialogActions from "../Dialogs/DialogActions.jsx";
import ContentFieldsAddCourse from "./ContentFieldsAddCourse.jsx";

const AddCourseDialog = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    nameCourse: "",
    detail: "",
    teacherId: "",
  });

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
      const courseData = {
        ...formData,
        teacherId: Number(formData.teacherId) || undefined,
      };
      await dispatch(createCourse(courseData)).unwrap();
      handleCloseDialog();
    } catch (err) {
      setErrorMessage(err?.message || err || "Failed to create course");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setFormData({
      nameCourse: "",
      detail: "",
      teacherId: "",
    });
    setErrorMessage(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle onClose={handleCloseDialog}>Add New Course</DialogTitle>

      <form onSubmit={handleFormSubmit}>
        <ContentFieldsAddCourse
          formData={formData}
          onInputChange={handleInputChange}
          errorMessage={errorMessage}
          isLoading={isLoading}
        />
        <DialogActions
          onCancel={handleCloseDialog}
          confirmText="Create Course"
          isLoading={isLoading}
          isConfirmDisabled={!formData.teacherId || !formData.teacherId}
        />
      </form>
    </Dialog>
  );
};
export default AddCourseDialog;