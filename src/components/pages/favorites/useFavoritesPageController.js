import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchFavorites, deleteFavorite } from "../../../store/slicesAndThunks/favoritesSlice";
import { fetchCourses } from "../../../store/slicesAndThunks/coursesSlice";
import { fetchUsers } from "../../../store/slicesAndThunks/usersSlice";

import { selectVisibleFavorites } from "../../../store/selectors/favoritesSelector";
import { selectVisibleCourses } from "../../../store/selectors/coursesSelectors";
import { selectVisibleUsers } from "../../../store/selectors/usersSelectors";
import { useIdMap } from "../../../hooks/useDataHelpers";

import {
  openDeleteFavoriteDialog as openDeleteFavoriteDialogAction,
  closeDeleteFavoriteDialog as closeDeleteFavoriteDialogAction,
} from "../../../store/slicesAndThunks/uiSlice";

export const useFavoritesPageController = () => {
  const dispatch = useDispatch();

  const favorites = useSelector(selectVisibleFavorites);
  const courses = useSelector(selectVisibleCourses);
  const users = useSelector(selectVisibleUsers);

  const isDeleteFavoriteDialogOpen = useSelector((s) => s.ui.isDeleteFavoriteDialogOpen);
  const favoriteToDelete = useSelector((s) => s.ui.favoriteToDelete);

  const refreshData = useCallback(() => {
    dispatch(fetchFavorites());
    dispatch(fetchCourses());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const coursesById = useIdMap(courses);
  const usersById = useIdMap(users);

  const openDeleteFavoriteDialog = (favorite) => dispatch(openDeleteFavoriteDialogAction(favorite));
  const closeDeleteFavoriteDialog = () => dispatch(closeDeleteFavoriteDialogAction());

  const confirmDeleteFavorite = async () => {
    if (!favoriteToDelete) return;
    await dispatch(deleteFavorite(favoriteToDelete.id));
    closeDeleteFavoriteDialog();
    refreshData();
  };

  return {
    favorites: favorites || [],
    onRefresh: refreshData,
    coursesById,
    usersById,
    onOpenDeleteFavoriteDialog: openDeleteFavoriteDialog,
    onCloseDeleteFavoriteDialog: closeDeleteFavoriteDialog,
    onConfirmDeleteFavorite: confirmDeleteFavorite,
    isDeleteFavoriteDialogOpen,
    favoriteToDelete,
  };
};
