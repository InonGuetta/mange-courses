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

export const createUser = createAsyncThunk(
    "users/createUser",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/users/create-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            if (!res.ok) return rejectWithValue(data?.message || "Create user failed");
            return data;
        } catch (e) {
            return rejectWithValue(e?.message || "Network error");
        }
    }
);

// ⚠️ קוד זה אינו בשימוש
export const updateUser = createAsyncThunk(
    "users/updateUser",
    async ({ id, patch }, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/users/update-user/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(patch),
            });
            const data = await res.json();

            if (!res.ok) return rejectWithValue(data?.message || "Update user failed");
            return data;
        } catch (e) {
            return rejectWithValue(e?.message || "Network error");
        }
    }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/users/delete-user/${id}`, {
                method: "DELETE",
            });

            let data = null;
            try {
                data = await res.json();
            } catch (_) {}

            if (!res.ok) return rejectWithValue(data?.message || "Delete user failed");
            return id;
        } catch (e) {
            return rejectWithValue(e?.message || "Network error");
        }
    }
);

// ⚠️ קוד זה אינו בשימוש
export const searchUsersByName = createAsyncThunk(
    "users/searchUsersByName",
    async (name, { rejectWithValue }) => {
        try {
            const qs = new URLSearchParams({ name }).toString();
            const res = await fetch(`/api/users/search-user?${qs}`);
            const data = await res.json();

            if (!res.ok) return rejectWithValue(data?.message || "Search users failed");
            return data;
        } catch (e) {
            return rejectWithValue(e?.message || "Network error");
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
            })
            .addCase(deleteUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.usersList = state.usersList.filter(u => u.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Delete user failed";
            });
    },
});

export const { setUsers, clearUsersError } = usersSlice.actions;

export default usersSlice.reducer;