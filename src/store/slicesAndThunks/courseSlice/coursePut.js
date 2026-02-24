import { createAsyncThunk } from "@reduxjs/toolkit";


export const updateCourse = createAsyncThunk(
    "courses/updateCourse",
    async ({ id, updates }, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth?.token;

            const res = await fetch(`/api/courses/update-course/${id}`, {
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
