import { toArray } from "../../domain/toArray";

export const selectVisibleMyCourses = (state) => toArray(state.myCourses?.myCoursesList);
