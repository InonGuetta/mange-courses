import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMyCourses,
  deleteStudentFromCourse,
} from "../../../store/slicesAndThunks/myCoursesSlice";
import { fetchUsers } from "../../../store/slicesAndThunks/usersSlice";
import { fetchCourses } from "../../../store/slicesAndThunks/coursesSlice";
import { addFavorite } from "../../../store/slicesAndThunks/favoritesSlice";

import { selectVisibleMyCourses } from "../../../store/selectors/myCoursesSelector";
import { selectVisibleUsers } from "../../../store/selectors/usersSelectors";
import { selectVisibleCourses } from "../../../store/selectors/coursesSelectors";
import { useIdMap, useFilteredUsers } from "../../../hooks/useDataHelpers";

export const useMyCoursesPageController = () => {
  const dispatch = useDispatch();
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isDeleteStudentDialogOpen, setIsDeleteStudentDialogOpen] = useState(false);
  const [courseToRemove, setCourseToRemove] = useState(null);

  const myCourses = useSelector(selectVisibleMyCourses) || [];
  const users = useSelector(selectVisibleUsers) || [];
  const courses = useSelector(selectVisibleCourses) || [];

  const students = useFilteredUsers(users, "student");
  const coursesById = useIdMap(courses);
  const usersById = useIdMap(users);

  const refreshData = useCallback(() => {
    dispatch(fetchMyCourses(selectedStudentId));
    dispatch(fetchUsers());
    dispatch(fetchCourses());
  }, [dispatch, selectedStudentId]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleAddFavorite = useCallback(
    (row) => {
      if (!selectedStudentId || !row.course_id) {
        console.warn("Missing studentId or courseId for adding favorite");
        return;
      }
      dispatch(
        addFavorite({ courseId: row.course_id, userId: selectedStudentId }),
      );
    },
    [dispatch, selectedStudentId],
  );

  const openDeleteStudentFromCourseDialog = useCallback((row) => {
    setCourseToRemove(row);
    setIsDeleteStudentDialogOpen(true);
  }, []);

  const closeDeleteStudentFromCourseDialog = useCallback(() => {
    setIsDeleteStudentDialogOpen(false);
    setCourseToRemove(null);
  }, []);

  const confirmDeleteStudentFromCourse = useCallback(async () => {
    if (!selectedStudentId || !courseToRemove?.course_id) {
      console.warn(
        "Missing studentId or courseId for removing student from course",
      );
      return;
    }
    await dispatch(
      deleteStudentFromCourse({
        courseId: courseToRemove.course_id,
        studentId: selectedStudentId,
      }),
    );
    closeDeleteStudentFromCourseDialog();
    refreshData();
  }, [
    dispatch,
    selectedStudentId,
    courseToRemove,
    closeDeleteStudentFromCourseDialog,
    refreshData,
  ]);

  const handleStudentChange = useCallback((newStudentId) => {
    setSelectedStudentId(newStudentId);
  }, []);

  useEffect(() => {
    if (selectedStudentId) {
      dispatch(fetchMyCourses(selectedStudentId));
    }
  }, [dispatch, selectedStudentId]);

  return {
    myCourses,
    onRefresh: refreshData,
    coursesById,
    usersById,
    onAddFavorite: handleAddFavorite,
    onOpenDeleteStudentFromCourseDialog: openDeleteStudentFromCourseDialog,
    onCloseDeleteStudentFromCourseDialog: closeDeleteStudentFromCourseDialog,
    onConfirmDeleteStudentFromCourse: confirmDeleteStudentFromCourse,
    isDeleteStudentDialogOpen,
    courseToRemove,
    currentStudentId: selectedStudentId,
    students,
    selectedStudentId,
    onStudentChange: handleStudentChange,
  };
};
