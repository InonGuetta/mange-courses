import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice.js';
import authReducer from "./slicesAndThunks/authSlice.js";
import coursesReducer from './slicesAndThunks/coursesSlice.js';
import favoritesReducer from './slicesAndThunks/favoritesSlice.js';



export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        courses: coursesReducer,
        favorites: favoritesReducer,
    },
});
