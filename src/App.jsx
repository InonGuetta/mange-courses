import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/layout/navbar/Navbar';

import AllCoursePage from './components/pages/courses/AllCoursesPage';
import FavoritesPage from './components/pages/favorites/FavoritesPage';
import MyCoursesPage from './components/pages/myCourses/MyCoursesPage';
import SignIn from "./components/pages/SignIn";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/courses" replace />} />
        <Route path="/courses" element={<AllCoursePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/my-courses" element={<MyCoursesPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App