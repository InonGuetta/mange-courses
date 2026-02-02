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

export function useUsersPageController() {
  const dispatch = useDispatch();

  const users = useSelector(selectVisibleUsers);
  const addUserDialogOpen = useSelector((s) => s.ui.addUserDialogOpen);
  const deleteUserDialogOpen = useSelector((s) => s.ui.deleteUserDialogOpen);
  const userToDelete = useSelector((s) => s.ui.userToDelete);

  const refresh = useCallback(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const openAddUser = () => dispatch(openAddUserDialogAction());
  const closeAddUser = () => {
    dispatch(closeAddUserDialogAction());
    refresh();
  };

  const openDeleteUser = (user) => dispatch(openDeleteUserDialogAction(user));
  const closeDeleteUser = () => dispatch(closeDeleteUserDialogAction());

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    await dispatch(deleteUser(userToDelete.id));
    closeDeleteUser();
    refresh();
  };

  return {
    users: users || [],
    refresh,
    addUserDialogOpen,
    openAddUser,
    closeAddUser,
    deleteUserDialogOpen,
    userToDelete,
    openDeleteUser,
    closeDeleteUser,
    confirmDeleteUser,
  };
}
