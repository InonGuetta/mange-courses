import { createAsyncThunk } from "@reduxjs/toolkit";
import { authHeader } from "./authSlice.js";

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue("No token");

      const res = await fetch("/api/auth/me", {
        headers: { ...authHeader(token) },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data?.message || "Fetch me faild");

      return data;
    } catch (err) {
      return rejectWithValue(err?.message || "Network error");
    }
  },
);
