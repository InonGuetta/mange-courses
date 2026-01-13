import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchMyCourses = createAsyncThunk(
    "myCourses/fetchMyCourses",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/student-courses/get-all-students-courses");
            const data = await res.json();

            if (!res.ok) return rejectWithValue(data?.message || "Fetch student courses");
            if (!Array.isArray(data)) return rejectWithValue("Expected an array of student-courses");

            return data;
        } catch (e) {
            return rejectWithValue(e?.message || "Network error")
        }
    }
)

const initialState = {
    status: "idle",
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
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchMyCourses.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.myCoursesList = action.payload;
                console.log("my courses in state:", action.payload);
            })
            .addCase(fetchMyCourses.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Fetch my courses failed";
            });
    },
});

export const { setMyCourses, clearMyCoursesError } = myCoursesSlice.actions;

export default myCoursesSlice.reducer;
