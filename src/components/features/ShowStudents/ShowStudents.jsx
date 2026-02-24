import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Dialog,
} from "@mui/material";

import { fetchStudentsByCourse } from "../../../store/slicesAndThunks/myCoursesSlice/myCoursesSlice.js";

import DialogTitle from "../Dialogs/DialogTitle.jsx";
import DialogActions from "../Dialogs/DialogActions.jsx";
import { ContentFieldsShowStudent } from "./ContentFieldsShowStudent.jsx";

const ShowStudentsDialog = ({
  isOpen,
  onClose,
  course,
  onDelete,
  refreshKey,
}) => {
  
  const dispatch = useDispatch();

  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (isOpen && course?.id) {
      setIsLoading(true);
      setErrorMessage(null);
      dispatch(fetchStudentsByCourse(course.id))
        .unwrap()
        .then((data) => {
          setStudents(data || []);
        })
        .catch((err) => {
          setErrorMessage(err?.message || err || "Failed to load students");
          setStudents([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setStudents([]);
      setErrorMessage(null);
    }
  }, [isOpen, course, dispatch, refreshKey]);

  const handleCloseDialog = () => {
    setStudents([]);
    setErrorMessage(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>

      <DialogTitle onClose={handleCloseDialog}>
        Students in Course: {course?.courseName || ""}
      </DialogTitle>

        <ContentFieldsShowStudent
         errorMessage={errorMessage}
         isLoading={isLoading}
         onDelete={onDelete}
         students={students}
       >
       </ContentFieldsShowStudent>

      <DialogActions
        onCancel={handleCloseDialog}
        cancelText="Close"
      >
      </DialogActions>
    </Dialog>
  );
};

export default ShowStudentsDialog;
