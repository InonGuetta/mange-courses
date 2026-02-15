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
  openDeleteDialog as openDeleteDialogAction,
  closeDeleteDialog as closeDeleteDialogAction,
  openNoDataDialog as openNoDataDialogAction,
  closeNoDataDialog as closeNoDataDialogAction,
} from "../../../store/slicesAndThunks/uiSlice";

export const useFavoritesPageController = () => {
  const dispatch = useDispatch();

  const favorites = useSelector(selectVisibleFavorites);
  const courses = useSelector(selectVisibleCourses);
  const users = useSelector(selectVisibleUsers);

  const isDeleteDialogOpen = useSelector((s) => s.ui.isDeleteDialogOpen);
  const deleteDialogType = useSelector((s) => s.ui.deleteDialogType);
  const itemToDelete = useSelector((s) => s.ui.itemToDelete);
  const isNoDataDialogOpen = useSelector((s) => s.ui.isNoDataDialogOpen);

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

  const openDeleteFavoriteDialog = (favorite) => dispatch(openDeleteDialogAction({ type: 'favorite', item: favorite }));
  const closeDeleteFavoriteDialog = () => dispatch(closeDeleteDialogAction());

  const confirmDeleteFavorite = async () => {
    if (!itemToDelete || deleteDialogType !== 'favorite') return;
    await dispatch(deleteFavorite(itemToDelete.id));
    closeDeleteFavoriteDialog();
    refreshData();
  };

  const closeNoDataDialog = () => dispatch(closeNoDataDialogAction());

  return {
    favorites: favorites || [],
    onRefresh: refreshData,
    coursesById,
    usersById,
    onOpenDeleteFavoriteDialog: openDeleteFavoriteDialog,
    onCloseDeleteFavoriteDialog: closeDeleteFavoriteDialog,
    onConfirmDeleteFavorite: confirmDeleteFavorite,
    isDeleteDialogOpen,
    deleteDialogType,
    itemToDelete,
    isNoDataDialogOpen,
    onCloseNoDataDialog: closeNoDataDialog,
  };
};
