import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


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

export const removeFavorite = createAsyncThunk(
    "favorites/removeFavorite",
    async (courseId, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth?.token;

            const res = await fetch(`/api/favorite/delete-favorite/${courseId}`, {
                method: "DELETE",
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            const data = await res.json().catch(() => null);
            if (!res.ok) return rejectWithValue(data?.message || "Remove favorite failed");
            return courseId;
        } catch (err) {
            return rejectWithValue(err?.message || "Network error");
        }
    }
);

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

const initialState = {
    state: "idle",
    error: null,
    favoriteCourseIds: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        setFavorites(state, action) {
            state.favoriteCourseIds = action.payload || [];
        },
        clearFavoritesError(state) {
            state.error = null;
        },
    },


    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.favorite = action.payload;
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Fetch favorites failed";
            })

            .addCase(addFavorite.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                state.status = "succeeded";
                const { courseId } = action.payload;
                if (!state.favoriteCourseIds.includes(courseId)) state.favoriteCourseIds.push(courseId);
            })
            .addCase(addFavorite.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Add favorites failed";
            })

            .addCase(removeFavorite.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.status = "succeeded";
                const id = action.payload;
                state.favoriteCourseIds = state.favoriteCourseIds.filter((x) => x !== id);
            })
            .addCase(removeFavorite.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Remove favorites failed";
            })

            .addCase(deleteFavorite.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteFavorite.fulfilled, (state, action) => {
                state.status = "succeeded";
                const id = action.payload;
                if (state.favorite) {
                    state.favorite = state.favorite.filter((fav) => fav.id !== id);
                }
            })
            .addCase(deleteFavorite.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Delete favorite failed";
            });
    },
});

export const { setFavorites, clearFavoritesError } = favoritesSlice.actions;

export const selectFavoriteIds = (state) => state.favorites.favoriteCourseIds;

export const selectFavoriteCourses = (state) => {
    const favIds = state.favorites.favoriteCourseIds;
    const courses = state.courses.coursesList;
    const set = new Set(favIds);
    return courses.filter((c) => set.has(c.id));
};

export default favoritesSlice.reducer;