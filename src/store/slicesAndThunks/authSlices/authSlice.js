import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../../utilities/constant.js";
import { statuses } from "../../../utilities/constant.js";

export const authHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

import { fetchMe } from "./authGet.js"; 
import {
  login,
  logout,
  register,
} from "./authPost.js";


const initialState = {
  status: statuses.idle,
  error: null,
  token: localStorage.getItem(auth.TOKEN_KEY) || null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setCredentials(state, action) {
      const { token, user } = action.payload || {};
      state.token = token || null;
      state.user = user || null;
      
      if (state.token) localStorage.setItem(auth.TOKEN_KEY, state.token);
      else localStorage.removeItem(auth.TOKEN_KEY);
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
      state.status = statuses.idle;
      state.error = null;
      localStorage.removeItem(auth.TOKEN_KEY);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = statuses.loading;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = statuses.succeeded;
        state.token = action.payload.token;
        state.user = action.payload.user;

        localStorage.setItem(auth.TOKEN_KEY, state.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = statuses.failed;
        state.error = action.payload || "Login failed";
      })

      .addCase(register.pending, (state) => {
        state.status = statuses.loading;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = statuses.succeeded;
        state.token = action.payload.token;
        state.user = action.payload.user;

        localStorage.setItem(auth.TOKEN_KEY, state.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = statuses.failed;
        state.error = action.payload || "Registration failed";
      })

      .addCase(fetchMe.pending, (state) => {
        state.status = statuses.loading;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = statuses.succeeded;
        state.user = action.payload.user;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.status = statuses.failed;
        state.error = action.payload || "Fetch me failed";
      })

      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.status = statuses.idle;
        state.error = null;
        localStorage.removeItem(auth.TOKEN_KEY);
      });
    },
});
export { fetchMe, login, logout, register };

export const { clearError, setCredentials, clearAuth } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectRole = (state) => state.auth.user?.role || null;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);

export default authSlice.reducer;
