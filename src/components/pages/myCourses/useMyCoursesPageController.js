import { useEffect, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMyCourses, deleteStudentFromCourse } from "../../../store/slicesAndThunks/myCoursesSlice";
import { fetchUsers } from "../../../store/slicesAndThunks/usersSlice";
import { fetchCourses } from "../../../store/slicesAndThunks/coursesSlice";
import { addFavorite } from "../../../store/slicesAndThunks/favoritesSlice";

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


  const onAddFavorite = useCallback((row) => {
    if (!selectedStudentId || !row.course_id) {
      console.warn("Missing studentId or courseId for adding favorite");
      return;
    }
    dispatch(addFavorite({ courseId: row.course_id, userId: selectedStudentId }));
  }, [dispatch, selectedStudentId]);

  const onDeleteStudentFromCourse = useCallback(async (row) => {
    if (!selectedStudentId || !row.course_id) {
      console.warn("Missing studentId or courseId for removing student from course");
      return;
    }
    await dispatch(deleteStudentFromCourse({ courseId: row.course_id, studentId: selectedStudentId }));
    refresh();
  }, [dispatch, selectedStudentId, refresh]);

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
    onDeleteStudentFromCourse,
    currentStudentId: selectedStudentId,
    students,
    selectedStudentId,
    onStudentChange: handleStudentChange,
  };
}
