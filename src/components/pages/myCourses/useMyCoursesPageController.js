import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMyCourses } from "../../../store/slicesAndThunks/myCoursesSlice";
import { fetchUsers } from "../../../store/slicesAndThunks/usersSlice";
import { fetchCourses } from "../../../store/slicesAndThunks/coursesSlice";

import { selectVisibleMyCourses } from "../../../store/selectors/myCoursesSelector";
import { selectVisibleUsers } from "../../../store/selectors/usersSelectors";
import { selectVisibleCourses } from "../../../store/selectors/coursesSelectors";

// Student ID - currently hardcoded to match the API call
const CURRENT_STUDENT_ID = 11;


export function useMyCoursesPageController() {
  const dispatch = useDispatch();

  const myCourses = useSelector(selectVisibleMyCourses) || [];
  const users = useSelector(selectVisibleUsers) || [];
  const courses = useSelector(selectVisibleCourses) || [];

  const refresh = useCallback(() => {
    dispatch(fetchMyCourses());
    dispatch(fetchUsers());
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const coursesById = useMemo(() => {
    const m = new Map();
    for (const c of courses) m.set(String(c.id), c);
    return m;
  }, [courses]);

  const usersById = useMemo(() => {
    const m = new Map();
    for (const u of users) m.set(String(u.id), u);
    return m;
  }, [users]);


  const onAddFavorite = (row) => {
    console.log("TODO add favorite from my course row:", row);
  };

  return {
    myCourses,
    refresh,
    coursesById,
    usersById,
    onAddFavorite,
    currentStudentId: CURRENT_STUDENT_ID,
  };
}
