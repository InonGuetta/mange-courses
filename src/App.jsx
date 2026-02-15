import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from './components/layout/navbar/Navbar';
import AllCoursePage from './components/pages/courses/AllCoursesPage';
import FavoritesPage from './components/pages/favorites/FavoritesPage';
import MyCoursesPage from './components/pages/myCourses/MyCoursesPage';
import UsersPage from './components/pages/users/UsersPage';
import SignIn from "./components/pages/auth/SignIn";
import SignUp from "./components/pages/auth/SignUp";

const AUTH_PATHS = ["/sign-in", "/sign-up"];

const App = () => {
  const { pathname } = useLocation();
  const isAuthPage = AUTH_PATHS.includes(pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}

      <Routes>
        {/* Auth routes */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* App routes */}
        <Route path="/" element={<Navigate to="/sign-in" replace />} />
        <Route path="/courses" element={<AllCoursePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/my-courses" element={<MyCoursesPage />} />
        <Route path="/users" element={<UsersPage />} />

        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </>
  );
};

export default App;