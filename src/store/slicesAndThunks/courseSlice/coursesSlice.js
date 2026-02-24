import { createSlice } from "@reduxjs/toolkit";
import { fetchCourses, searchCourses } from "./courseGet.js";
import { createCourse } from "./coursePost.js";
import { deleteCourse } from "./courseDelete.js";
import { updateCourse } from "./coursePut.js";
import { statuses } from "../../../utilities/constant.js";

const initialState = {
  status: statuses.idle,
  error: null,
  coursesList: [],
  selectedCourseId: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setSelectedCourseId(state, action) {
      state.selectedCourseId = action.payload;
    },

    clearCoursesError(state) {
      state.error = null;
    },

    setCourses(state, action) {
      state.coursesList = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchCourses.pending, (state) => {
        state.status = statuses.loading;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = statuses.succeeded;
        state.coursesList = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = statuses.failed;
        state.error = action.payload || "Fetch courses failed";
      })

      .addCase(createCourse.pending, (state) => {
        state.status = statuses.loading;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.status = statuses.succeeded;
        state.coursesList.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.status = statuses.failed;
        state.error = action.payload || "Create courses failed";
      })

      .addCase(updateCourse.pending, (state) => {
        state.status = statuses.loading;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.status = statuses.succeeded;
        const updated = action.payload;
        const idx = state.coursesList.findIndex(
          (course) => course.id === updated.id,
        );
        if (idx !== -1) state.coursesList[idx] = updated;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.status = statuses.failed;
        state.error = action.payload || "Update courses failed";
      })

      .addCase(deleteCourse.pending, (state) => {
        state.status = statuses.loading;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.status = statuses.succeeded;
        const id = action.payload;
        state.coursesList = state.coursesList.filter(
          (course) => course.id !== id,
        );

        if (state.selectedCourseId === id) state.selectedCourseId = null;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.status = statuses.failed;
        state.error = action.payload || "Delete courses failed";
      })

      .addCase(searchCourses.pending, (state) => {
        state.status = statuses.loading;
        state.error = null;
      })
      .addCase(searchCourses.fulfilled, (state, action) => {
        state.status = statuses.succeeded;
        state.coursesList = action.payload;
      })
      .addCase(searchCourses.rejected, (state, action) => {
        state.status = statuses.failed;
        state.error = action.payload || "Search courses failed";
      });
  },
});

export const { setSelectedCourseId, clearCoursesError, setCourses } =
  coursesSlice.actions;
export {
  fetchCourses,
  searchCourses,
  createCourse,
  deleteCourse,
  updateCourse,
};

export const selectedCoursesState = (state) => state.courses;
export const selectedCoursesList = (state) => state.courses.coursesList;
export const selectSelectedCourse = (state) => {
  const courseId = state.courses.selectedCourseId;

  return state.courses.coursesList.find(({ id }) => id === courseId) || null;
};

export default coursesSlice.reducer;
