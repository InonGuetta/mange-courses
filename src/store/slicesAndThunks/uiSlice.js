import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openAddDialog: false,
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
  },
});

export const { openAddDialog, closeAddDialog } = uiSlice.actions;
export default uiSlice.reducer;
