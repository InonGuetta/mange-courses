import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './slicesAndThunks/usersSlice/usersSlice.js';
import authReducer from "./slicesAndThunks/authSlices/authSlice.js";
import coursesReducer from './slicesAndThunks/courseSlice/coursesSlice.js';
import favoritesReducer from './slicesAndThunks/favoriteSlice/favoritesSlice.js';
import myCoursesReducer from './slicesAndThunks/myCoursesSlice/myCoursesSlice.js';
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
