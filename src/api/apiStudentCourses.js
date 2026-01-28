import { apiFetch } from "./http.js";

const BASE = "/api/student-courses";

export const getStudentsByCourse = (courseId) => {
    return apiFetch(`${BASE}/get-students-by-course/${courseId}`);
}
