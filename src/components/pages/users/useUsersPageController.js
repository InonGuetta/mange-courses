import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers, deleteUser } from "../../../store/slicesAndThunks/usersSlice";
import { selectVisibleUsers } from "../../../store/selectors/usersSelectors";

import {
  openAddUserDialog as openAddUserDialogAction,
  closeAddUserDialog as closeAddUserDialogAction,
  openDeleteUserDialog as openDeleteUserDialogAction,
  closeDeleteUserDialog as closeDeleteUserDialogAction,
} from "../../../store/slicesAndThunks/uiSlice";

export const useUsersPageController = () => {
  const dispatch = useDispatch();

  const users = useSelector(selectVisibleUsers);
  const isAddUserDialogOpen = useSelector((s) => s.ui.isAddUserDialogOpen);
  const isDeleteUserDialogOpen = useSelector((s) => s.ui.isDeleteUserDialogOpen);
  const userToDelete = useSelector((s) => s.ui.userToDelete);

  const refreshData = useCallback(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const openAddUserDialog = () => dispatch(openAddUserDialogAction());
  const closeAddUserDialog = () => {
    dispatch(closeAddUserDialogAction());
    refreshData();
  };

  const openDeleteUserDialog = (user) => dispatch(openDeleteUserDialogAction(user));
  const closeDeleteUserDialog = () => dispatch(closeDeleteUserDialogAction());

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    await dispatch(deleteUser(userToDelete.id));
    closeDeleteUserDialog();
    refreshData();
  };

  return {
    users: users || [],
    onRefresh: refreshData,
    isAddUserDialogOpen,
    onOpenAddUserDialog: openAddUserDialog,
    onCloseAddUserDialog: closeAddUserDialog,
    isDeleteUserDialogOpen,
    userToDelete,
    onOpenDeleteUserDialog: openDeleteUserDialog,
    onCloseDeleteUserDialog: closeDeleteUserDialog,
    onConfirmDeleteUser: confirmDeleteUser,
  };
};
