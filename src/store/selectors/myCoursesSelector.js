import { toArray } from "../../utilities/toArray";

export const selectVisibleMyCourses = (state) => toArray(state.myCourses?.myCoursesList);