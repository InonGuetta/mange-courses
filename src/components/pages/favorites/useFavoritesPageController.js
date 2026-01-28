import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchFavorites, deleteFavorite } from "../../../store/slicesAndThunks/favoritesSlice";
import { fetchCourses } from "../../../store/slicesAndThunks/coursesSlice";
import { fetchUsers } from "../../../store/slicesAndThunks/usersSlice";

import { selectVisibleFavorites } from "../../../store/selectors/favoritesSelector";
import { selectVisibleCourses } from "../../../store/selectors/coursesSelectors";
import { selectVisibleUsers } from "../../../store/selectors/usersSelectors";

import {
  openDeleteFavoriteDialog as openDeleteFavoriteDialogAction,
  closeDeleteFavoriteDialog as closeDeleteFavoriteDialogAction,
} from "../../../store/slicesAndThunks/uiSlice";

export function useFavoritesPageController() {
  const dispatch = useDispatch();

  const favorites = useSelector(selectVisibleFavorites);
  const courses = useSelector(selectVisibleCourses);
  const users = useSelector(selectVisibleUsers);

  const deleteFavoriteDialogOpen = useSelector((s) => s.ui.deleteFavoriteDialogOpen);
  const favoriteToDelete = useSelector((s) => s.ui.favoriteToDelete);

  const refresh = useCallback(() => {
    dispatch(fetchFavorites());
    dispatch(fetchCourses());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const coursesById = useMemo(() => {
    const m = new Map();
    for (const c of courses || []) m.set(String(c.id), c);
    return m;
  }, [courses]);

  const usersById = useMemo(() => {
    const m = new Map();
    for (const u of users || []) m.set(String(u.id), u);
    return m;
  }, [users]);

  const openDelete = (favorite) => dispatch(openDeleteFavoriteDialogAction(favorite));
  const closeDelete = () => dispatch(closeDeleteFavoriteDialogAction());

  const confirmDelete = async () => {
    if (!favoriteToDelete) return;
    await dispatch(deleteFavorite(favoriteToDelete.id));
    closeDelete();
    refresh();
  };

  return {
    favorites: favorites || [],
    refresh,
    coursesById,
    usersById,
    openDelete,
    closeDelete,
    confirmDelete,
    deleteFavoriteDialogOpen,
    favoriteToDelete,
  };
}
