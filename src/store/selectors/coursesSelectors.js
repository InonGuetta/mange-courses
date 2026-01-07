import { toCoursesArray } from "../../domain/toCoursesArray";

export const selectVisibleCourses = (state) => {
    const coursesList = state.courses?.coursesList ?? [];
    return toCoursesArray(coursesList);
};