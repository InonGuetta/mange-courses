import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
} from "@mui/material";

import { addStudentToCourse } from "../../../store/slicesAndThunks/myCoursesSlice/myCoursesSlice.js";

import DialogTitle from "../Dialogs/DialogTitle.jsx";
import DialogActions from "../Dialogs/DialogActions.jsx";
import ContentFieldsAddStudentToCourse from "./ContentFieldsAddStudentToCourse.jsx";

const AddStudentToCourseDialog = ({ isOpen, onClose, course }) => {

  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
 
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    if (!selectedStudentId || !course?.id) {
      setErrorMessage("Please select a student");
      setIsLoading(false);
    }

    try {
      await dispatch(
        addStudentToCourse({
          courseId: course.id,
          studentId: selectedStudentId,
        }),
      ).unwrap();
      handleCloseDialog();
    } catch (err) {
      setErrorMessage(err?.message || err || "Failed to add student to course");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setSelectedStudentId("");
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
        Add Student to Course
      </DialogTitle>

      <form onSubmit={handleFormSubmit}>
        <ContentFieldsAddStudentToCourse
          errorMessage={errorMessage}
          isLoading={isLoading}
          selectedStudentId={selectedStudentId}
          setSelectedStudentId={setSelectedStudentId}
          course={course}
        />

        <DialogActions
          onCancel={handleCloseDialog}
          confirmText={isLoading ? "Adding..." : "Add Student"}
          confirmColor="success"
          isLoading={isLoading}
          isConfirmDisabled={!selectedStudentId}
        />
      </form>
    </Dialog>
  );
};

export default AddStudentToCourseDialog;
