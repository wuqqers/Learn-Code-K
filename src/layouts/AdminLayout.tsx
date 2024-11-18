import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { BookOpen, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import CourseManagement from '../pages/admin/CourseManagement';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-8">
          <Link
            to="/admin/courses"
            className="flex items-center px-4 py-2 text-gray-200 hover:bg-indigo-700"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Kurslar
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center px-4 py-2 text-gray-200 hover:bg-indigo-700"
          >
            <Settings className="h-5 w-5 mr-2" />
            Ayarlar
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-gray-200 hover:bg-indigo-700"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Çıkış Yap
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <Routes>
          <Route path="courses" element={<CourseManagement />} />
          <Route path="settings" element={<div>Ayarlar Sayfası</div>} />
          <Route path="/" element={<CourseManagement />} />
        </Routes>
      </div>
    </div>
  );
}