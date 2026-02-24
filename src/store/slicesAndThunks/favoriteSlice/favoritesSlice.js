import { createSlice } from "@reduxjs/toolkit";
import { statuses } from "../../../utilities/constant.js";

import { fetchFavorites } from "./favoriteGet.js";
import { addFavorite } from "./favoritePost.js";
import { deleteFavorite } from "./favoriteDelete.js";


const initialState = {
  state: statuses.idle,
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
        state.status = statuses.loading;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = statuses.succeeded;
        state.favorite = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Fetch favorites failed";
      })
      
      .addCase(addFavorite.pending, (state) => {
        state.status = statuses.loading;
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.status = statuses.succeeded;
        const { courseId } = action.payload;
        if (!state.favoriteCourseIds.includes(courseId))
          state.favoriteCourseIds.push(courseId);
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Add favorites failed";
      })
      
      .addCase(deleteFavorite.pending, (state) => {
        state.status = statuses.loading;
        state.error = null;
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.status = statuses.succeeded;
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

export { fetchFavorites, addFavorite, deleteFavorite };
export const { setFavorites, clearFavoritesError } = favoritesSlice.actions;

export const selectFavoriteIds = (state) => state.favorites.favoriteCourseIds;

export const selectFavoriteCourses = (state) => {
  const favIds = state.favorites.favoriteCourseIds;
  const courses = state.courses.coursesList;
  const set = new Set(favIds);
  return courses.filter((c) => set.has(c.id));
};

export default favoritesSlice.reducer;
