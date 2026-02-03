import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddCourseDialogOpen: false,
  isDeleteCourseDialogOpen: false,
  courseToDelete: null,
  isEditCourseDialogOpen: false,
  courseToEdit: null,
  isDeleteFavoriteDialogOpen: false,
  favoriteToDelete: null,
  isShowStudentsDialogOpen: false,
  courseForStudents: null,
  isAddStudentDialogOpen: false,
  courseForAddStudent: null,
  isAddUserDialogOpen: false,
  isDeleteUserDialogOpen: false,
  userToDelete: null,
};


const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAddCourseDialog(state) {
      state.isAddCourseDialogOpen = true;
    },
    closeAddCourseDialog(state) {
      state.isAddCourseDialogOpen = false;
    },
    openDeleteCourseDialog(state, action) {
      state.isDeleteCourseDialogOpen = true;
      state.courseToDelete = action.payload;
    },
    closeDeleteCourseDialog(state) {
      state.isDeleteCourseDialogOpen = false;
      state.courseToDelete = null;
    },
    openEditCourseDialog(state, action) {
      state.isEditCourseDialogOpen = true;
      state.courseToEdit = action.payload;
    },
    closeEditCourseDialog(state) {
      state.isEditCourseDialogOpen = false;
      state.courseToEdit = null;
    },
    openDeleteFavoriteDialog(state, action) {
      state.isDeleteFavoriteDialogOpen = true;
      state.favoriteToDelete = action.payload;
    },
    closeDeleteFavoriteDialog(state) {
      state.isDeleteFavoriteDialogOpen = false;
      state.favoriteToDelete = null;
    },
    openShowStudentsDialog(state, action) {
      state.isShowStudentsDialogOpen = true;
      state.courseForStudents = action.payload;
    },
    closeShowStudentsDialog(state) {
      state.isShowStudentsDialogOpen = false;
      state.courseForStudents = null;
    },
    openAddStudentDialog(state, action) {
      state.isAddStudentDialogOpen = true;
      state.courseForAddStudent = action.payload;
    },
    closeAddStudentDialog(state) {
      state.isAddStudentDialogOpen = false;
      state.courseForAddStudent = null;
    },
    openAddUserDialog(state) {
      state.isAddUserDialogOpen = true;
    },
    closeAddUserDialog(state) {
      state.isAddUserDialogOpen = false;
    },
    openDeleteUserDialog(state, action) {
      state.isDeleteUserDialogOpen = true;
      state.userToDelete = action.payload;
    },
    closeDeleteUserDialog(state) {
      state.isDeleteUserDialogOpen = false;
      state.userToDelete = null;
    },
  },
});

export const { 
  openAddCourseDialog, 
  closeAddCourseDialog, 
  openDeleteCourseDialog, 
  closeDeleteCourseDialog,
  openEditCourseDialog,
  closeEditCourseDialog,
  openDeleteFavoriteDialog,
  closeDeleteFavoriteDialog,
  openShowStudentsDialog,
  closeShowStudentsDialog,
  openAddStudentDialog,
  closeAddStudentDialog,
  openAddUserDialog,
  closeAddUserDialog,
  openDeleteUserDialog,
  closeDeleteUserDialog
} = uiSlice.actions;
export default uiSlice.reducer;
