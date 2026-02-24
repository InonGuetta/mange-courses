import { createAsyncThunk } from "@reduxjs/toolkit";

export const addStudentToCourse = createAsyncThunk(
    "myCourses/addStudentToCourse",
    async ({ courseId, studentId }, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/student-courses/add-student-to-course/${courseId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studentId: studentId }),
            });
            const data = await res.json();

            if (!res.ok) return rejectWithValue(data?.message || "Failed to add student to course");
            return { courseId, studentId, data };
        } catch (e) {
            return rejectWithValue(e?.message || "Network error");
        }
    }
)