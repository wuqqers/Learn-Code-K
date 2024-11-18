import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search, Bell, LogOut, BookOpen, Layout } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button className="p-2 rounded-md text-gray-400 lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
              <span className="text-2xl font-bold text-indigo-600">K! Learn</span>
            </Link>
          </div>
          
          {user ? (
            <>
              <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Search courses..."
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className={`flex items-center text-gray-600 hover:text-gray-900 ${
                    location.pathname === '/dashboard' ? 'text-indigo-600' : ''
                  }`}
                >
                  <Layout className="h-5 w-5 mr-1" />
                  <span>Dashboard</span>
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin/courses"
                    className={`flex items-center text-gray-600 hover:text-gray-900 ${
                      location.pathname === '/admin/courses' ? 'text-indigo-600' : ''
                    }`}
                  >
                    <BookOpen className="h-5 w-5 mr-1" />
                    <span>Manage Courses</span>
                  </Link>
                )}
                <button className="p-2 rounded-md text-gray-400">
                  <Bell className="h-6 w-6" />
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}