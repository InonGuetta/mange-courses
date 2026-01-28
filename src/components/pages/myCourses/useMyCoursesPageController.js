import { useEffect, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMyCourses } from "../../../store/slicesAndThunks/myCoursesSlice";
import { fetchUsers } from "../../../store/slicesAndThunks/usersSlice";
import { fetchCourses } from "../../../store/slicesAndThunks/coursesSlice";

import { selectVisibleMyCourses } from "../../../store/selectors/myCoursesSelector";
import { selectVisibleUsers } from "../../../store/selectors/usersSelectors";
import { selectVisibleCourses } from "../../../store/selectors/coursesSelectors";


export function useMyCoursesPageController() {
  const dispatch = useDispatch();
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const myCourses = useSelector(selectVisibleMyCourses) || [];
  const users = useSelector(selectVisibleUsers) || [];
  const courses = useSelector(selectVisibleCourses) || [];

  const students = useMemo(() => {
    return users.filter(user => user.role === "student");
  }, [users]);

  const refresh = useCallback(() => {
    dispatch(fetchMyCourses(selectedStudentId));
    dispatch(fetchUsers());
    dispatch(fetchCourses());
  }, [dispatch, selectedStudentId]);

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

  const handleStudentChange = useCallback((newStudentId) => {
    setSelectedStudentId(newStudentId);
  }, []);

  useEffect(() => {
    if (selectedStudentId) {
      dispatch(fetchMyCourses(selectedStudentId));
    }
  }, [dispatch, selectedStudentId]);

  return {
    myCourses,
    refresh,
    coursesById,
    usersById,
    onAddFavorite,
    currentStudentId: selectedStudentId,
    students,
    selectedStudentId,
    onStudentChange: handleStudentChange,
  };
}
