import { toArray } from "../../utilities/toArray";

export const selectVisibleCourses = (state) => toArray(state.courses?.coursesList); 