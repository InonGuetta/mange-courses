import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, deleteCourse } from "../../../store/slicesAndThunks/coursesSlice";
import { fetchUsers } from "../../../store/slicesAndThunks/usersSlice";
import { selectVisibleCourses } from "../../../store/selectors/coursesSelectors";
import { selectVisibleUsers } from "../../../store/selectors/usersSelectors";
import {
    openAddDialog as openAddDialogAction,
    closeAddDialog as closeAddDialogAction,
    openDeleteDialog as openDeleteDialogAction,
    closeDeleteDialog as closeDeleteDialogAction,
    openEditDialog as openEditDialogAction,
    closeEditDialog as closeEditDialogAction,
} from "../../../store/slicesAndThunks/uiSlice";

export function useCoursesPageController() {
    const dispatch = useDispatch();

    const courses = useSelector(selectVisibleCourses);
    const users = useSelector(selectVisibleUsers);

    const openAddDialog = useSelector((s) => s.ui.openAddDialog);
    const deleteDialogOpen = useSelector((s) => s.ui.deleteDialogOpen);
    const courseToDelete = useSelector((s) => s.ui.courseToDelete);
    const editDialogOpen = useSelector((s) => s.ui.editDialogOpen);
    const courseToEdit = useSelector((s) => s.ui.courseToEdit);

    const refresh = useCallback(() => {
        dispatch(fetchCourses());
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const openAdd = () => dispatch(openAddDialogAction());
    const closeAdd = () => {
        dispatch(closeAddDialogAction());
        refresh();
    };

    const openDelete = (course) => dispatch(openDeleteDialogAction(course));
    const closeDelete = () => dispatch(closeDeleteDialogAction());

    const confirmDelete = async () => {
        if (!courseToDelete) return;
        await dispatch(deleteCourse(courseToDelete.id));
        closeDelete();
        refresh();
    };

    const openEdit = (course) => dispatch(openEditDialogAction(course));
    const closeEdit = () => {
        dispatch(closeEditDialogAction());
        refresh();
    };

    return {
        courses,
        users,
        refresh,
        openAdd,
        closeAdd,
        openDelete,
        closeDelete,
        confirmDelete,
        openEdit,
        closeEdit,
        openAddDialog,
        deleteDialogOpen,
        courseToDelete,
        editDialogOpen,
        courseToEdit,
    };
}
