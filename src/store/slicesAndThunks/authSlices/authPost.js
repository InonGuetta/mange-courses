import { createAsyncThunk } from "@reduxjs/toolkit";

import  { authHeader } from "./authSlice.js";


export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { ...authHeader(token) },
      }).catch(() => {});
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data?.message || "Login failed");

      return data;
    } catch (err) {
      return rejectWithValue(err?.message || "Network error");
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok)
        return rejectWithValue(data?.message || "Registration failed");

      return data;
    } catch (err) {
      return rejectWithValue(err?.message || "Network error");
    }
  },
);
