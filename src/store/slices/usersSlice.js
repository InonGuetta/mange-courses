import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: "idle",
    error: null,
    usersList: []
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state, action) {
            state.usersList = action.payload;
        },
        addUser(state, action) {
            state.usersList.push(action.payload);
        },
        updateUser(state, action) {
            const updated = action.payload;
            const idx = state.usersList.findIndex(itemUser => itemUser.id === updated.id);
            if (idx !== -1) state.usersList[idx] = updated;
        },
        removeUser(state, action) {
            const id = action.payload;
            state.usersList = state.usersList.filter(itemUser => itemUser.id !== id);
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setUsers, addUser, updateUser, removeUser, setStatus, setError } = usersSlice.actions

export default usersSlice.reducer;