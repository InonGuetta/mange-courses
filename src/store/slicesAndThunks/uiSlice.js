import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isAddCourseDialogOpen: false,
  isEditCourseDialogOpen: false,
  courseToEdit: null,
  isShowStudentsDialogOpen: false,
  courseForStudents: null,
  isAddStudentDialogOpen: false,
  courseForAddStudent: null,
  isAddUserDialogOpen: false,
  isEditUserDialogOpen: false,
  userToEdit: null,
  isDeleteDialogOpen: false,
  deleteDialogType: null, 
  itemToDelete: null,
  studentToDelete: null,
  courseForDeleteStudent: null,
  studentsRefreshKey: 0,
  isNoDataDialogOpen: false,
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
    openDeleteDialog(state, action) {
      state.isDeleteDialogOpen = true;
      state.deleteDialogType = action.payload.type;
      state.itemToDelete = action.payload.item;
    },
    closeDeleteDialog(state) {
      state.isDeleteDialogOpen = false;
      state.deleteDialogType = null;
      state.itemToDelete = null;
    },
    openEditCourseDialog(state, action) {
      state.isEditCourseDialogOpen = true;
      state.courseToEdit = action.payload;
    },
    closeEditCourseDialog(state) {
      state.isEditCourseDialogOpen = false;
      state.courseToEdit = null;
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
    openEditUserDialog(state, action) {
      state.isEditUserDialogOpen = true;
      state.userToEdit = action.payload;
    },
    closeEditUserDialog(state) {
      state.isEditUserDialogOpen = false;
      state.userToEdit = null;
    },
    openDeleteStudentDialog(state, action) {
      state.isDeleteDialogOpen = true;
      state.deleteDialogType = 'student';
      state.studentToDelete = action.payload.student;
      state.courseForDeleteStudent = action.payload.course;
    },
    closeDeleteStudentDialog(state) {
      state.isDeleteDialogOpen = false;
      state.deleteDialogType = null;
      state.studentToDelete = null;
      state.courseForDeleteStudent = null;
    },
    incrementStudentsRefreshKey(state) {
      state.studentsRefreshKey += 1;
    },
    openNoDataDialog(state) {
      state.isNoDataDialogOpen = true;
    },
    closeNoDataDialog(state) {
      state.isNoDataDialogOpen = false;
    },
  },
});

export const { 
  openAddCourseDialog, 
  closeAddCourseDialog, 
  openDeleteDialog,
  closeDeleteDialog,
  openEditCourseDialog,
  closeEditCourseDialog,
  openShowStudentsDialog,
  closeShowStudentsDialog,
  openAddStudentDialog,
  closeAddStudentDialog,
  openAddUserDialog,
  closeAddUserDialog,
  openEditUserDialog,
  closeEditUserDialog,
  openDeleteStudentDialog,
  closeDeleteStudentDialog,
  incrementStudentsRefreshKey,
  openNoDataDialog,
  closeNoDataDialog,
} = uiSlice.actions;
export default uiSlice.reducer;
