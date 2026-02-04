import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers, deleteUser } from "../../../store/slicesAndThunks/usersSlice";
import { selectVisibleUsers } from "../../../store/selectors/usersSelectors";
import {
  openAddUserDialog as openAddUserDialogAction,
  closeAddUserDialog as closeAddUserDialogAction,
  openDeleteDialog as openDeleteDialogAction,
  closeDeleteDialog as closeDeleteDialogAction,
  openEditUserDialog as openEditUserDialogAction,
  closeEditUserDialog as closeEditUserDialogAction,
} from "../../../store/slicesAndThunks/uiSlice";


export const useUsersPageController = () => {
  const dispatch = useDispatch();

  const users = useSelector(selectVisibleUsers);
  const isAddUserDialogOpen = useSelector((s) => s.ui.isAddUserDialogOpen);
  const isEditUserDialogOpen = useSelector((s) => s.ui.isEditUserDialogOpen);
  const userToEdit = useSelector((s) => s.ui.userToEdit);
  const isDeleteDialogOpen = useSelector((s) => s.ui.isDeleteDialogOpen);
  const deleteDialogType = useSelector((s) => s.ui.deleteDialogType);
  const itemToDelete = useSelector((s) => s.ui.itemToDelete);

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

  const openEditUserDialog = (user) => dispatch(openEditUserDialogAction(user));
  const closeEditUserDialog = () => {
    dispatch(closeEditUserDialogAction());
    refreshData();
  };

  const openDeleteUserDialog = (user) => dispatch(openDeleteDialogAction({ type: 'user', item: user }));
  const closeDeleteUserDialog = () => dispatch(closeDeleteDialogAction());

  const confirmDeleteUser = async () => {
    if (!itemToDelete || deleteDialogType !== 'user') return;
    await dispatch(deleteUser(itemToDelete.id));
    closeDeleteUserDialog();
    refreshData();
  };

  return {
    users: users || [],
    onRefresh: refreshData,
    isAddUserDialogOpen,
    onOpenAddUserDialog: openAddUserDialog,
    onCloseAddUserDialog: closeAddUserDialog,
    isEditUserDialogOpen,
    userToEdit,
    onOpenEditUserDialog: openEditUserDialog,
    onCloseEditUserDialog: closeEditUserDialog,
    isDeleteDialogOpen,
    deleteDialogType,
    itemToDelete,
    onOpenDeleteUserDialog: openDeleteUserDialog,
    onCloseDeleteUserDialog: closeDeleteUserDialog,
    onConfirmDeleteUser: confirmDeleteUser,
  };
};
