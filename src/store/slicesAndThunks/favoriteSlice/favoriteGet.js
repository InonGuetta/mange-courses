import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFavorites = createAsyncThunk(
    "favorites/fetchFavorites",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/favorite/get-all-favorites");
            const data = await res.json();
            if (!res.ok) return rejectWithValue(data?.message || "Fetch Favorite failed");
            return data.favorites;
        } catch (err) {
            return rejectWithValue(err?.message || "Network error");
        }
    }
)
