import { createAsyncThunk } from "@reduxjs/toolkit";


export const createCourse = createAsyncThunk(
    "courses/createCourse",
    async (newCourse, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth?.token;

            const res = await fetch("/api/courses/create-course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(newCourse),
            });

            const data = await res.json();
            if (!res.ok) return rejectWithValue(data?.message || "Create course failed");
            return data;
        } catch (err) {
            return rejectWithValue(err?.message || "Network error");
        }
    }
)
