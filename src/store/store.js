import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slicesAndThunks/usersSlice.js';
import authReducer from "./slicesAndThunks/authSlice.js";
import coursesReducer from './slicesAndThunks/coursesSlice.js';
import favoritesReducer from './slicesAndThunks/favoritesSlice.js';
import myCoursesReducer from './slicesAndThunks/myCoursesSlice.js';
import uiReducer from './slicesAndThunks/uiSlice.js';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        courses: coursesReducer,
        favorites: favoritesReducer,
        myCourses: myCoursesReducer,
        ui: uiReducer,
    },
});
