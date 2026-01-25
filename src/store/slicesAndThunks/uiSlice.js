import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openAddDialog: false,
  deleteDialogOpen: false,
  courseToDelete: null,
  editDialogOpen: false,
  courseToEdit: null,
  deleteFavoriteDialogOpen: false,
  favoriteToDelete: null,
};


const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAddDialog(state) {
      state.openAddDialog = true;
    },
    closeAddDialog(state) {
      state.openAddDialog = false;
    },
    openDeleteDialog(state, action) {
      state.deleteDialogOpen = true;
      state.courseToDelete = action.payload;
    },
    closeDeleteDialog(state) {
      state.deleteDialogOpen = false;
      state.courseToDelete = null;
    },
    openEditDialog(state, action) {
      state.editDialogOpen = true;
      state.courseToEdit = action.payload;
    },
    closeEditDialog(state) {
      state.editDialogOpen = false;
      state.courseToEdit = null;
    },
    openDeleteFavoriteDialog(state, action) {
      state.deleteFavoriteDialogOpen = true;
      state.favoriteToDelete = action.payload;
    },
    closeDeleteFavoriteDialog(state) {
      state.deleteFavoriteDialogOpen = false;
      state.favoriteToDelete = null;
    },
  },
});

export const { 
  openAddDialog, 
  closeAddDialog, 
  openDeleteDialog, 
  closeDeleteDialog,
  openEditDialog,
  closeEditDialog,
  openDeleteFavoriteDialog,
  closeDeleteFavoriteDialog
} = uiSlice.actions;
export default uiSlice.reducer;
