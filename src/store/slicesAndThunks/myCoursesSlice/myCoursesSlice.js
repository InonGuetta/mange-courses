import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statuses } from "../../../utilities/constant.js";

import {
  fetchMyCourses,
  fetchStudentsByCourse,
} from "./myCoursesGet.js";
import { addStudentToCourse } from "./myCoursesPost.js";
import { deleteStudentFromCourse } from "./myCoursesDelete.js";



const initialState = {
    status: statuses.idle,
    error: null,
    myCoursesList: []
};

const myCoursesSlice = createSlice({
    name: "myCourses",
    initialState,
    reducers: {
        setMyCourses(state, action) {
            state.myCoursesList = action.payload;
        },
        clearMyCoursesError(state) {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchMyCourses.pending, (state) => {
                state.status = statuses.loading;
                state.error = null;
            })
            .addCase(fetchMyCourses.fulfilled, (state, action) => {
                state.status = statuses.succeeded;
                state.myCoursesList = action.payload;
            })
            .addCase(fetchMyCourses.rejected, (state, action) => {
                state.status = statuses.failed;
                state.error = action.payload || "Fetch my courses failed";
            })
        },
});

export {
  fetchMyCourses,
  fetchStudentsByCourse,
  addStudentToCourse,
  deleteStudentFromCourse,
};

export const { setMyCourses, clearMyCoursesError } = myCoursesSlice.actions;

export default myCoursesSlice.reducer;
