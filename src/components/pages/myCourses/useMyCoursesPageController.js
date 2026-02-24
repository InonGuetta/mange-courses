import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMyCourses,
  deleteStudentFromCourse,
} from "../../../store/slicesAndThunks/myCoursesSlice/myCoursesSlice.js";
import { fetchUsers } from "../../../store/slicesAndThunks/usersSlice/usersSlice.js";
import { fetchCourses } from "../../../store/slicesAndThunks/courseSlice/coursesSlice.js";
import {
  addFavorite,
  deleteFavorite,
  fetchFavorites,
} from "../../../store/slicesAndThunks/favoriteSlice/favoritesSlice.js";
import { selectVisibleMyCourses } from "../../../store/selectors/myCoursesSelector";
import { selectVisibleFavorites } from "../../../store/selectors/favoritesSelector";
import { selectVisibleUsers } from "../../../store/selectors/usersSelectors";
import { selectVisibleCourses } from "../../../store/selectors/coursesSelectors";
import { useIdMap, useFilteredUsers } from "../../../hooks/useDataHelpers";
import {
  openNoDataDialog as openNoDataDialogAction,
  closeNoDataDialog as closeNoDataDialogAction,
} from "../../../store/slicesAndThunks/uiSlice";

export const useMyCoursesPageController = () => {
  const dispatch = useDispatch();
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isDeleteStudentDialogOpen, setIsDeleteStudentDialogOpen] =
    useState(false);
  const [courseToRemove, setCourseToRemove] = useState(null);

  const myCourses = useSelector(selectVisibleMyCourses) || [];
  const users = useSelector(selectVisibleUsers) || [];
  const courses = useSelector(selectVisibleCourses) || [];
  const favorites = useSelector(selectVisibleFavorites) || [];
  const isNoDataDialogOpen = useSelector((s) => s.ui.isNoDataDialogOpen);

  const students = useFilteredUsers(users, "student");
  const coursesById = useIdMap(courses);
  const usersById = useIdMap(users);

  const refreshData = useCallback(() => {
    dispatch(fetchMyCourses(selectedStudentId));
    dispatch(fetchUsers());
    dispatch(fetchCourses());
    dispatch(fetchFavorites());
  }, [dispatch, selectedStudentId]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleAddFavorite = useCallback(
    (row) => {
      if (!selectedStudentId || !row.courseId) {
        console.warn("Missing studentId or courseId for adding favorite");
        return;
      }
      dispatch(
          addFavorite({ courseId: row.courseId, userId: selectedStudentId }),
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

    if (!selectedStudentId || !courseToRemove?.courseId) {
      console.warn(
        "Missing studentId or courseId for removing student from course",
      );
      return;
    }
    await dispatch(
      deleteStudentFromCourse({
  
        courseId: courseToRemove.courseId,
        studentId: selectedStudentId,
      }),
    );
    const favoriteToDelete = favorites.find(
      (fav) =>
          String(fav.courseId) === String(courseToRemove.courseId) &&
          String(fav.userId) === String(selectedStudentId),
    );
    if (favoriteToDelete) {
      dispatch(deleteFavorite(favoriteToDelete.id));
    }
    closeDeleteStudentFromCourseDialog();
    refreshData();
  }, [
    dispatch,
    selectedStudentId,
    courseToRemove,
    favorites,
    closeDeleteStudentFromCourseDialog,
    refreshData,
  ]);

  const handleStudentChange = useCallback((newStudentId) => {
    setSelectedStudentId(newStudentId);
  }, []);

  const closeNoDataDialog = () => dispatch(closeNoDataDialogAction());

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
    isNoDataDialogOpen,
    onCloseNoDataDialog: closeNoDataDialog,
  };
};
