import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchFavorites } from "../../../store/slicesAndThunks/favoritesSlice";
import { fetchCourses } from "../../../store/slicesAndThunks/coursesSlice";
import { fetchUsers } from "../../../store/slicesAndThunks/usersSlice";

import { selectVisibleFavorites } from "../../../store/selectors/favoritesSelector";
import { selectVisibleCourses } from "../../../store/selectors/coursesSelectors";
import { selectVisibleUsers } from "../../../store/selectors/usersSelectors";

export function useFavoritesPageController() {
  const dispatch = useDispatch();

  const favorites = useSelector(selectVisibleFavorites);
  const courses = useSelector(selectVisibleCourses);
  const users = useSelector(selectVisibleUsers);

  const refresh = useCallback(() => {
    dispatch(fetchFavorites());
    dispatch(fetchCourses());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // במקום find בתוך map:
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

  const onDeleteFavorite = (favoriteRow) => {
    console.log("TODO: delete favorite", favoriteRow);
  };

  return {
    favorites: favorites || [],
    refresh,
    coursesById,
    usersById,
    onDeleteFavorite,
  };
}
