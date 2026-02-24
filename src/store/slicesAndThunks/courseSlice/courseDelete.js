import { createAsyncThunk } from "@reduxjs/toolkit";


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
