import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCourses = createAsyncThunk(
    "courses/fetchCourses",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/courses/get-all-courses");
            const data = await res.json();

            if (!res.ok) return rejectWithValue(data?.message || "Fetch courses failed");
            return data.courses;
        } catch (err) {
            return rejectWithValue(err?.message || "Network error");
        }
    }
);

export const createCourse = createAsyncThunk(
    "courses/createCourse",
    async (newCourse, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth?.token;
            console.log("Creating course with data:", newCourse);

            const res = await fetch("/api/courses/create-course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(newCourse),
            });

            const data = await res.json();
            console.log("Create course response:", { status: res.status, data });
            if (!res.ok) return rejectWithValue(data?.message || "Create course failed");
            return data;
        } catch (err) {
            console.error("Create course error:", err);
            return rejectWithValue(err?.message || "Network error");
        }
    }
)

export const updateCourse = createAsyncThunk(
    "courses/updateCourse",
    async ({ id, updates }, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth?.token;

            const res = await fetch(`/api/courses/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(updates),
            });
            const data = await res.json();
            if (!res.ok) return rejectWithValue(data?.message || "Update course failed");
            return data;
        } catch (err) {
            return rejectWithValue(err?.message || "Network error");
        }
    }
);

export const deleteCourse = createAsyncThunk(
    "courses/deleteCourse",
    async (id, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth?.token;

            const res = await fetch(`/api/courses/delete-course/${id}`, {
                method: "DELETE",
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            let data = null;
            try {
                data = await res.json();
            } catch (_) { }

            if (!res.ok) return rejectWithValue(data?.message || "Delete course failed");
            return id;
        } catch (err) {
            return rejectWithValue(err?.message || "Network error");
        }
    }
);


const initialState = {
    status: "idle",
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
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.coursesList = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Fetch courses failed";
            })

            .addCase(createCourse.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.coursesList.push(action.payload);
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Create courses failed";
            })

            .addCase(updateCourse.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updated = action.payload;
                const idx = state.coursesList.findIndex((course) => course.id === updated.id);
                if (idx !== -1) state.coursesList[idx] = updated;
            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Update courses failed";
            })

            .addCase(deleteCourse.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.status = "succeeded";
                const id = action.payload;
                state.coursesList = state.coursesList.filter((course) => course.id !== id);
                if (state.selectedCourseId === id) state.selectedCourseId === null;
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Delete courses failed";
            });
    },
});

export const { setSelectedCourseId, clearCoursesError, setCourses } = coursesSlice.actions;

export const selectedCoursesState = (state) => state.courses;
export const selectedCoursesList = (state) => state.courses.coursesList;
export const selectSelectedCourse = (state) => {
    const id = state.courses.selectedCourseId;
    return state.courses.coursesList.find((course) => course.id === id) || null;
};

export default coursesSlice.reducer;

