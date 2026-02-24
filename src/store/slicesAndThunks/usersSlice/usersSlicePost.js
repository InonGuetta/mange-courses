import { createAsyncThunk } from "@reduxjs/toolkit";


export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/users/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok)
        return rejectWithValue(data?.message || "Create user failed");
      return data;
    } catch (e) {
      return rejectWithValue(e?.message || "Network error");
    }
  },
);
