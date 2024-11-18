import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Award, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Dashboard from '../components/Dashboard';

export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Code Learning</h1>
        </div>
        <nav className="mt-8">
          <Link
            to="/dashboard"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Home className="h-5 w-5 mr-2" />
            Ana Sayfa
          </Link>
          <Link
            to="/dashboard/courses"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Kurslarım
          </Link>
          <Link
            to="/dashboard/achievements"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Award className="h-5 w-5 mr-2" />
            Başarılarım
          </Link>
          <Link
            to="/dashboard/settings"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Settings className="h-5 w-5 mr-2" />
            Ayarlar
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Çıkış Yap
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="courses" element={<div>Kurslarım Sayfası</div>} />
          <Route path="achievements" element={<div>Başarılarım Sayfası</div>} />
          <Route path="settings" element={<div>Ayarlar Sayfası</div>} />
        </Routes>
      </div>
    </div>
  );
}