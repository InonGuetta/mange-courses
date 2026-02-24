import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/courses/get-all-courses");
      const data = await res.json();

      if (!res.ok)
        return rejectWithValue(data?.message || "Fetch courses failed");
      return data.courses;
    } catch (err) {
      return rejectWithValue(err?.message || "Network error");
    }
  },
);

export const searchCourses = createAsyncThunk(
  "courses/searchCourses",
  async (nameCourse, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `/api/courses/search-course?course-name=${encodeURIComponent(nameCourse)}`,
      );
      const data = await res.json();
      if (!res.ok)
        return rejectWithValue(data?.message || "Search courses failed");
      return data.courses || data;
    } catch (err) {
      return rejectWithValue(err?.message || "Network error");
    }
  },
);
