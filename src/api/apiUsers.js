import { apiFetch } from "./http.js";

const BASE = "/api/users";

export const createUser = (payload) => {
    return apiFetch(`${BASE}/create-user`, { method: "POST", body: payload });
}

export const getAllUsers = () => {
    return apiFetch(`${BASE}/get-all-users`);
}

export const updateUser = (id, patch) => {
    return apiFetch(`${BASE}/update-user/${id}`, { method: "PUT", body: patch });
}

export const deleteUser = (id) => {
    return apiFetch(`${BASE}/delete-user/${id}`, { method: "DELETE" });
}

export const searchUsersByName = (name) => {
    const qs = new URLSearchParams({name}).toString();
    return apiFetch(`${BASE}/search-user?${qs}`)
}