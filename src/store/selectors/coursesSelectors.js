import { toArray } from "../../domain/toArray";

export const selectVisibleCourses = (state) => toArray(state.courses?.coursesList); 