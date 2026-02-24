import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteFavorite = createAsyncThunk(
    "favorites/deleteFavorite",
    async (id, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth?.token;

            const res = await fetch(`/api/favorite/delete-favorite/${id}`, {
                method: "DELETE",
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            let data = null;
            try {
                data = await res.json();
            } catch (_) { }

            if (!res.ok) return rejectWithValue(data?.message || "Delete favorite failed");
            return id;
        } catch (err) {
            return rejectWithValue(err?.message || "Network error");
        }
    }
);
