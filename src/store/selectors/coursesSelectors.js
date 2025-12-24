import { createSelector } from "@reduxjs/toolkit";
// איפה זה היה 
// import { filterCourses } from "../../domain/courses/filterCourses";

export const selectCoursesState = (state) => state.courses;

export const selectCoursesList = createSelector(
    [selectCoursesState],
    (coursesState) => coursesState?.coursesList ?? []
);

export const selectCoursesQuery = createSelector(
    [selectCoursesState],
    (coursesState) => coursesState?.query ?? ""
);

export const selectCoursesFilters = createSelector(
    [selectCoursesState],
    (coursesState) => coursesState?.filters ?? null
);

export const selectCoursesSort = createSelector(
    [selectCoursesState],
    (coursesState) => coursesState?.sort ?? null
);

export const selectVisibleCourses = createSelector(
    [selectCoursesList, selectCoursesQuery, selectCoursesFilters, selectCoursesSort],
    (coursesList, query, filters, sort) => {
        return filterCourses(coursesList, { query, filters, sort });
    }
);