import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, deleteCourse } from "../../../store/slicesAndThunks/coursesSlice";
import { fetchUsers } from "../../../store/slicesAndThunks/usersSlice";
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
} from "../../../store/slicesAndThunks/uiSlice";

export const useCoursesPageController = () => {
    const dispatch = useDispatch();

    const courses = useSelector(selectVisibleCourses);
    const users = useSelector(selectVisibleUsers);

    const isAddCourseDialogOpen = useSelector((s) => s.ui.isAddCourseDialogOpen);
    const isDeleteDialogOpen = useSelector((s) => s.ui.isDeleteDialogOpen);
    const deleteDialogType = useSelector((s) => s.ui.deleteDialogType);
    const itemToDelete = useSelector((s) => s.ui.itemToDelete);
    const isEditCourseDialogOpen = useSelector((s) => s.ui.isEditCourseDialogOpen);
    const courseToEdit = useSelector((s) => s.ui.courseToEdit);
    const isShowStudentsDialogOpen = useSelector((s) => s.ui.isShowStudentsDialogOpen);
    const courseForStudents = useSelector((s) => s.ui.courseForStudents);
    const isAddStudentDialogOpen = useSelector((s) => s.ui.isAddStudentDialogOpen);
    const courseForAddStudent = useSelector((s) => s.ui.courseForAddStudent);

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

    const openDeleteCourseDialog = (course) => dispatch(openDeleteDialogAction({ type: 'course', item: course }));
    const closeDeleteCourseDialog = () => dispatch(closeDeleteDialogAction());

    const confirmDeleteCourse = async () => {
        if (!itemToDelete || deleteDialogType !== 'course') return;
        await dispatch(deleteCourse(itemToDelete.id));
        closeDeleteCourseDialog();
        refreshData();
    };

    const openEditCourseDialog = (course) => dispatch(openEditCourseDialogAction(course));
    const closeEditCourseDialog = () => {
        dispatch(closeEditCourseDialogAction());
        refreshData();
    };

    const openShowStudentsDialog = (course) => dispatch(openShowStudentsDialogAction(course));
    const closeShowStudentsDialog = () => dispatch(closeShowStudentsDialogAction());

    const openAddStudentToCourseDialog = (course) => dispatch(openAddStudentDialogAction(course));
    const closeAddStudentToCourseDialog = () => {
        dispatch(closeAddStudentDialogAction());
        refreshData();
    };

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
    };
};
