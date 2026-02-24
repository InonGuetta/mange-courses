import { createAsyncThunk } from "@reduxjs/toolkit";



export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/users/delete-user/${id}`, {
        method: "DELETE",
      });

      let data = null;
      try {
        data = await res.json();
      } catch (_) {}

      if (!res.ok)
        return rejectWithValue(data?.message || "Delete user failed");
      return id;
    } catch (e) {
      return rejectWithValue(e?.message || "Network error");
    }
  },
);