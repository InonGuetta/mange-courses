import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchMyCourses = createAsyncThunk(
    "myCourses/fetchMyCourses",
    async (studentId, { rejectWithValue }) => {
        if (!studentId) {
            return [];
        }
        try {
            const res = await fetch(`/api/student-courses/get-courses-by-student/${studentId}`);
            const data = await res.json();

            if (!res.ok) return rejectWithValue(data?.message || "Fetch student courses");
            if (!Array.isArray(data)) return rejectWithValue("Expected an array of student-courses");

            return data; 
        } catch (e) {
            return rejectWithValue(e?.message || "Network error")
        }
    }
)

export const fetchStudentsByCourse = createAsyncThunk(
    "myCourses/fetchStudentsByCourse",
    async (courseId, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/student-courses/get-students-by-course/${courseId}`);
            const data = await res.json();

            if (!res.ok) return rejectWithValue(data?.message || "Fetch courses courses");
            if (!Array.isArray(data)) return rejectWithValue("Expected an array of courses-student");

            return data;
        } catch (e) {
            return rejectWithValue(e?.message || "Network error")
        }
    }
)
