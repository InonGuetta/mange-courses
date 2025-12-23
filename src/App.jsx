import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/layout/navbar/Navbar';

import AllCoursePage from './components/pages/AllCoursesPage';
import FavoritesPage from './components/pages/FavoritesPage';
import MyCoursesPage from './components/pages/MyCoursesPage';

function App() {
  // שיעורי בית 
  // תעשה את הלוגיקה הזאת דרך reducer
  // ולא דרך state רגיל
  const [count, setCount] = useState(0)
  return (
    <>
      <Navbar />

      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<Navigate to="/courses" replace />} />
        <Route path="/courses" element={<AllCoursePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/my-courses" element={<MyCoursesPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </>
  );
}

export default App
