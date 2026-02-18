import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { roles, definition } from "../../../utilities/constant.js";
import {
  fetchCourses,
  deleteCourse,
  searchCourses,
} from "../../../store/slicesAndThunks/coursesSlice";
import { fetchUsers } from "../../../store/slicesAndThunks/usersSlice";
import { deleteStudentFromCourse } from "../../../store/slicesAndThunks/myCoursesSlice";
import { selectVisibleCourses } from "../../../store/selectors/coursesSelectors";
import { selectVisibleUsers } from "../../../store/selectors/usersSelectors";
import {
  openAddCourseDialog as openAddCourseDialogAction,
  closeAddCourseDialog as closeAddCourseDialogAction,
  openDeleteDialog as openDeleteDialogAction,
  closeDeleteDialog as closeDeleteDialogAction,
  openEditCourseDialog as openEditCourseDialogAction,
  closeEditCourseDialog as closeEditCourseDialogAction,
  openShowStudentsDialog as openShowStudentsDialogAction,
  closeShowStudentsDialog as closeShowStudentsDialogAction,
  openAddStudentDialog as openAddStudentDialogAction,
  closeAddStudentDialog as closeAddStudentDialogAction,
  openDeleteStudentDialog as openDeleteStudentDialogAction,
  closeDeleteStudentDialog as closeDeleteStudentDialogAction,
  incrementStudentsRefreshKey as incrementStudentsRefreshKeyAction,
  openNoDataDialog as openNoDataDialogAction,
  closeNoDataDialog as closeNoDataDialogAction,
} from "../../../store/slicesAndThunks/uiSlice";

export const useCoursesPageController = () => {
  const dispatch = useDispatch();

  const courses = useSelector(selectVisibleCourses);
  const users = useSelector(selectVisibleUsers);
  const isAddCourseDialogOpen = useSelector((selector) => selector.ui.isAddCourseDialogOpen);
  const isDeleteDialogOpen = useSelector((selector) => selector.ui.isDeleteDialogOpen);
  const deleteDialogType = useSelector((selector) => selector.ui.deleteDialogType);
  const itemToDelete = useSelector((selector) => selector.ui.itemToDelete);
  const isEditCourseDialogOpen = useSelector(
    (selector) => selector.ui.isEditCourseDialogOpen,
  );
  const courseToEdit = useSelector((selector) => selector.ui.courseToEdit);
  const isShowStudentsDialogOpen = useSelector(
    (selector) => selector.ui.isShowStudentsDialogOpen,
  );
  const courseForStudents = useSelector((selector) => selector.ui.courseForStudents);
  const isAddStudentDialogOpen = useSelector(
    (selector) => selector.ui.isAddStudentDialogOpen,
  );
  const courseForAddStudent = useSelector((selector) => selector.ui.courseForAddStudent);
  const studentToDelete = useSelector((selector) => selector.ui.studentToDelete);
  const courseForDeleteStudent = useSelector(
    (selector) => selector.ui.courseForDeleteStudent,
  );
  const studentsRefreshKey = useSelector((selector) => selector.ui.studentsRefreshKey);
  const isNoDataDialogOpen = useSelector((selector) => selector.ui.isNoDataDialogOpen);

  const refreshData = useCallback(() => {
    dispatch(fetchCourses());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const openAddCourseDialog = () => dispatch(openAddCourseDialogAction());
  const closeAddCourseDialog = () => {
    dispatch(closeAddCourseDialogAction());
    refreshData();
  };

  const openDeleteCourseDialog = (course) =>
    dispatch(openDeleteDialogAction({ type: definition.course, item: course }));
  const closeDeleteCourseDialog = () => dispatch(closeDeleteDialogAction());

  // הקוד הישן לפני  התיקון לאבחון סוג הבעיה
  //   const confirmDeleteCourse = async () => {
  //     if (!itemToDelete || deleteDialogType !== 'course') return;
  //     await dispatch(deleteCourse(itemToDelete.id));
  //     closeDeleteCourseDialog();
  //     refreshData();
  // };


  // הקוד החדש דוגמה לאיך לתקן שלא יהיה return באמצע הפונקציה
  const confirmDeleteCourse = async () => {
    if (itemToDelete && deleteDialogType === definition.course) {
      await dispatch(deleteCourse(itemToDelete.id));
      closeDeleteCourseDialog();
      refreshData();
    }
  };

  const openEditCourseDialog = (course) =>
    dispatch(openEditCourseDialogAction(course));
  const closeEditCourseDialog = () => {
    dispatch(closeEditCourseDialogAction());
    refreshData();
  };

  const openShowStudentsDialog = (course) =>
    dispatch(openShowStudentsDialogAction(course));
  const closeShowStudentsDialog = () =>
    dispatch(closeShowStudentsDialogAction());

  const openAddStudentToCourseDialog = (course) =>
    dispatch(openAddStudentDialogAction(course));
  const closeAddStudentToCourseDialog = () => {
    dispatch(closeAddStudentDialogAction());
    refreshData();
  };

  const openDeleteStudentDialog = (student) => {
    dispatch(
      openDeleteStudentDialogAction({ student, course: courseForStudents }),
    );
  };
  const closeDeleteStudentDialog = () =>
    dispatch(closeDeleteStudentDialogAction());

  const confirmDeleteStudent = async () => {
    if (
      studentToDelete &&
      courseForDeleteStudent &&
      deleteDialogType === roles.student
    ){

      const studentId = studentToDelete.studentId || studentToDelete.id;
      await dispatch(
        deleteStudentFromCourse({
          courseId: courseForDeleteStudent.id,
          studentId: studentId,
        }),
      );
      dispatch(incrementStudentsRefreshKeyAction());
      closeDeleteStudentDialog();
    }
  };
  
  const handleSearch = useCallback(
    async (nameCourse) => {
      const result = await dispatch(searchCourses(nameCourse));
      if (
        result.payload &&
        Array.isArray(result.payload) &&
        result.payload.length === 0
      ) {
        dispatch(openNoDataDialogAction());
      }
    },
    [dispatch],
  );

  const closeNoDataDialog = () => dispatch(closeNoDataDialogAction());

  return {
    courses,
    users,
    onRefresh: refreshData,
    onOpenAddCourseDialog: openAddCourseDialog,
    onCloseAddCourseDialog: closeAddCourseDialog,
    onOpenDeleteCourseDialog: openDeleteCourseDialog,
    onCloseDeleteCourseDialog: closeDeleteCourseDialog,
    onConfirmDeleteCourse: confirmDeleteCourse,
    onOpenEditCourseDialog: openEditCourseDialog,
    onCloseEditCourseDialog: closeEditCourseDialog,
    isAddCourseDialogOpen,
    isDeleteDialogOpen,
    deleteDialogType,
    itemToDelete,
    isEditCourseDialogOpen,
    courseToEdit,
    isShowStudentsDialogOpen,
    courseForStudents,
    onOpenShowStudentsDialog: openShowStudentsDialog,
    onCloseShowStudentsDialog: closeShowStudentsDialog,
    isAddStudentDialogOpen,
    courseForAddStudent,
    onOpenAddStudentToCourseDialog: openAddStudentToCourseDialog,
    onCloseAddStudentToCourseDialog: closeAddStudentToCourseDialog,
    studentToDelete,
    courseForDeleteStudent,
    onOpenDeleteStudentDialog: openDeleteStudentDialog,
    onCloseDeleteStudentDialog: closeDeleteStudentDialog,
    onConfirmDeleteStudent: confirmDeleteStudent,
    studentsRefreshKey,
    onSearch: handleSearch,
    isNoDataDialogOpen,
    onCloseNoDataDialog: closeNoDataDialog,
  };
};
