import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/users/get-all-users");
      const data = await res.json();

      if (!res.ok)
        return rejectWithValue(data?.message || "Fetch users failed");
      if (!data.users) return rejectWithValue("No users found");
      return data.users;
    } catch (e) {
      return rejectWithValue(e?.message || "Network error");
    }
  },
); 

export const searchUsers = createAsyncThunk(
  "users/searchUsers",
  async (name, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/users/search-user?name=${encodeURIComponent(name)}`);
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data?.message || "Search users failed");
      return data.users || data;
    } catch (err) {
      return rejectWithValue(err?.message || "Network error");
    }
  },
);