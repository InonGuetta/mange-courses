import { toCoursesArray } from "../../domain/toMyCoursesArray";

export const selectVisibleMyCourses = (state) => {
    const myCoursesList = state.myCourses?.myCoursesList ?? [];
    return toCoursesArray(myCoursesList);
};
