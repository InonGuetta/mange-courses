import { createAsyncThunk } from "@reduxjs/toolkit";

export const addFavorite = createAsyncThunk(
    "favorites/addFavorite",
    async ({ courseId, userId }, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth?.token;

            const res = await fetch(`/api/favorite/add-favorite/${courseId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({ userId }),
            });

            const data = await res.json().catch(() => null);
            if (!res.ok) return rejectWithValue(data?.message || "Add favorite failed");
            return { courseId, userId, data };

        } catch (err) {
            return rejectWithValue(err?.message || "Network error");
        }
    }
);
