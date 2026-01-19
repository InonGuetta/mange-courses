import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const TOKEN_KEY = "token";

const initialState = {
    status: "idle",
    error: null,
    token: localStorage.getItem(TOKEN_KEY) || null,
    user: null,
};

const authHeader = (token) => ({
    Authorization: `Bearer ${token}`,
});

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) return rejectWithValue(data?.message || "Login failed");

            return data;
        }
        catch (err) {
            return rejectWithValue(err?.message || "Network error");
        }
    }
);

export const fetchMe = createAsyncThunk(
    "auth/fetchMe",
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            if (!token) return rejectWithValue("No token");

            const res = await fetch("/api/auth/me", {
                headers: { ...authHeader(token) },
            });

            const data = await res.json();
            if (!res.ok) return rejectWithValue(data?.message || "Fetch me faild");

            return data
        } catch (err) {
            return rejectWithValue(err?.message || "Network error");
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { getState }) => {
        const token = getState().auth.token;

        try {
            if (token) {
                await fetch("/api/auth/logout", {
                    method: "POST",
                    headers: { ...authHeader(token) },
                });
            }
        } catch (_) {
        }
        return data
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
        setCredentials(state, action) {
            const { token, user } = action.payload || {};
            state.token = token || null;
            state.user = user || null;

            if (state.token) localStorage.setItem(TOKEN_KEY, state.token);
            else localStorage.removeItem(TOKEN_KEY);
        },
        clearAuth(state) {
            state.token = null;
            state.user = null;
            state.status = "idle";
            state.error = null;
            localStorage.removeItem(TOKEN_KEY);
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.token = action.payload.token;
                state.user = action.payload.user;

                localStorage.setItem(TOKEN_KEY, state.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Login failed";
            })

            .addCase(fetchMe.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
            })
            .addCase(fetchMe.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Fetch me failed";
            })

            .addCase(logout.fulfilled, (state) => {
                state.token = null;
                state.user = null;
                state.status = "idle";
                state.error = null;
                localStorage.removeItem(TOKEN_KEY);
            });
    },
});

export const { clearError, setCredentials, clearAuth} = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectRole = (state) => state.auth.user?.role || null;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);

export default authSlice.reducer;