import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import CourseManagement from './pages/admin/CourseManagement';
import CourseView from './pages/CourseView'; // Yeni import
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

export default function AppRouter() {
  const location = useLocation();
  const showNavbar = !['/login', '/register'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className={`${showNavbar ? 'pt-16' : ''}`}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin only route */}
          <Route
            path="/admin/courses"
            element={
              <PrivateRoute adminOnly>
                <CourseManagement />
              </PrivateRoute>
            }
          />
          
          {/* Course view route */}
          <Route
            path="/courses/:courseId"
            element={
              <PrivateRoute>
                <CourseView />
              </PrivateRoute>
            }
          />
          
          {/* User and Admin route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </>
  );
}