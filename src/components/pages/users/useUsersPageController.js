import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "../../../store/slicesAndThunks/usersSlice";
import { selectVisibleUsers } from "../../../store/selectors/usersSelectors";

import {
  openAddUserDialog as openAddUserDialogAction,
  closeAddUserDialog as closeAddUserDialogAction,
} from "../../../store/slicesAndThunks/uiSlice";

export function useUsersPageController() {
  const dispatch = useDispatch();

  const users = useSelector(selectVisibleUsers);
  const addUserDialogOpen = useSelector((s) => s.ui.addUserDialogOpen);

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

  return {
    users: users || [],
    refresh,
    addUserDialogOpen,
    openAddUser,
    closeAddUser,
  };
}
