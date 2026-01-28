import { apiFetch } from "./http.js";

const BASE = "/api/student-courses";

export const getStudentsByCourse = (courseId) => {
    return apiFetch(`${BASE}/get-students-by-course/${courseId}`);
}

export const removeStudentFromCourse = (courseId, studentId) => {
    return apiFetch(`${BASE}/remove-student-from-course/${courseId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: studentId }),
    });
}

export const addStudentToCourse = (courseId, studentId) => {
    return apiFetch(`${BASE}/add-student-to-course/${courseId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: studentId }),
    });
}
