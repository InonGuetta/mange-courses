import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (_, { rejectWithValue }) => {
        try{            
            const res = await fetch("/api/users/get-all-users");
            const data = await res.json();
            
            if(!res.ok) return rejectWithValue(data?.message || "Fetch users failed");
            if(!data.users) return rejectWithValue("No users found");
            return data.users;
        }catch(e){
            return rejectWithValue(e?.message || "Network error")
        }
    }
);

const initialState = {
    status: "idle",
    error: null,
    usersList: []
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state, action) {
            state.usersList = action.payload;
        },
        clearUsersError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.usersList = action.payload;
                console.log("users stored in state:", action.payload);
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Fetch users failed";
            });
    },
});

export const { setUsers, clearUsersError } = usersSlice.actions;

export default usersSlice.reducer;