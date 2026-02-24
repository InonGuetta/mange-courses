import { createAsyncThunk } from "@reduxjs/toolkit";


export const deleteStudentFromCourse = createAsyncThunk(
    "myCourses/deleteStudentFromCourse",
    async ({ courseId, studentId }, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/student-courses/remove-student-from-course/${courseId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studentId: studentId }),
            });
            const data = await res.json();

            if (!res.ok) return rejectWithValue(data?.message || "Failed to remove student from course");
            return { courseId, studentId };
        } catch (e) {
            return rejectWithValue(e?.message || "Network error");
        }
    }
)