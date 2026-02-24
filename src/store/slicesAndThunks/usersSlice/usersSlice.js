import { createSlice } from "@reduxjs/toolkit";
import { statuses } from "../../../utilities/constant.js";

import {
  fetchUsers,
  searchUsers,
} from "./usersSliceGet.js";
import { updateUser } from "./usersSlicePut.js";
import { deleteUser } from "./usersSliceDelete.js";
import { createUser } from "./usersSlicePost.js";


const initialState = {
  status: statuses.idle,
  error: null,
  usersList: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.usersList = action.payload;
    },
    clearUsersError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = statuses.loading;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = statuses.succeeded;
        state.usersList = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = statuses.failed;
        state.error = action.payload || "Fetch users failed";
      })
      
      .addCase(deleteUser.pending, (state) => {
        state.status = statuses.loading;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = statuses.succeeded;
        state.usersList = state.usersList.filter(
          (u) => u.id !== action.payload,
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = statuses.failed;
        state.error = action.payload || "Delete user failed";
      })

      .addCase(updateUser.pending, (state) => {
        state.status = statuses.loading;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = statuses.succeeded;
        const updatedUser = action.payload;
        const index = state.usersList.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) {
          state.usersList[index] = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = statuses.failed;
        state.error = action.payload || "Update user failed";
      })
      
      .addCase(searchUsers.pending, (state) => {
        state.status = statuses.loading;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status = statuses.succeeded;
        state.usersList = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = statuses.failed;
        state.error = action.payload || "Search users failed";
      });
  },
});

export { fetchUsers, searchUsers, updateUser, deleteUser, createUser };

export const { setUsers, clearUsersError } = usersSlice.actions;

export default usersSlice.reducer;
