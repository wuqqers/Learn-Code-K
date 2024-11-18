import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Course } from '../types';
import { getCourses } from '../api/courses';
import CourseCard from '../components/CourseCard';
import { Search, Filter, BookOpen, Users, Rocket } from 'lucide-react';
import { courses as mockCourses } from '../data/mockData';

export default function Courses() {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedLevel, setSelectedLevel] = React.useState('all');
  const [error, setError] = React.useState<string | null>(null);
  const [filteredCourses, setFilteredCourses] = React.useState<Course[]>([]);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const backendCourses = await getCourses();
        const allCourses = process.env.NODE_ENV === 'development' 
          ? [...mockCourses, ...backendCourses]
          : backendCourses;
        
        setCourses(allCourses);
        setFilteredCourses(allCourses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setError('Kursları yüklerken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        setCourses(mockCourses);
        setFilteredCourses(mockCourses);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  React.useEffect(() => {
    if (!courses.length) return;
    
    const filtered = courses.filter(course => {
      const searchMatch = !searchTerm || (
        (course.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
         course.description?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      
      const levelMatch = selectedLevel === 'all' || 
                        course.level?.toLowerCase() === selectedLevel.toLowerCase();
      
      return searchMatch && levelMatch;
    });
    
    setFilteredCourses(filtered);
    console.log('Filtered courses:', filtered);
  }, [searchTerm, selectedLevel, courses]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(e.target.value);
  };

  const levelOptions = [
    { value: 'all', label: 'Tüm Seviyeler' },
    { value: 'beginner', label: 'Başlangıç' },
    { value: 'intermediate', label: 'Orta' },
    { value: 'advanced', label: 'İleri' }
  ];

  const stats = [
    { 
      icon: <BookOpen className="h-6 w-6" />, 
      value: courses.length, 
      label: 'Aktif Kurs' 
    },
    { 
      icon: <Users className="h-6 w-6" />, 
      value: courses.reduce((total, course) => total + (course.enrolledCount || 0), 0), 
      label: 'Toplam Öğrenci' 
    },
    { 
      icon: <Rocket className="h-6 w-6" />, 
      value: '24/7', 
      label: 'Destek' 
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Geleceğin Teknolojilerini Öğrenin
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
              Modern web geliştirme, mobil uygulama ve yazılım teknolojilerinde uzmanlaşın.
              Sektör liderleri tarafından hazırlanan kurslarla kariyerinizi ileriye taşıyın.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white shadow-lg transform -translate-y-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-center space-x-4 p-6 bg-white rounded-lg">
                <div className="text-indigo-600">{stat.icon}</div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Kurs adı veya açıklama ara..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 h-5 w-5" />
            <select
              value={selectedLevel}
              onChange={handleLevelChange}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            >
              {levelOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500">
            {filteredCourses.length} kurs bulundu
            {searchTerm && ` "${searchTerm}" için`}
            {selectedLevel !== 'all' && ` ${levelOptions.find(opt => opt.value === selectedLevel)?.label} seviyesinde`}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
            {error}
          </div>
        )}

        {filteredCourses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">Aradığınız kriterlere uygun kurs bulunamadı.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLevel('all');
              }}
              className="mt-4 text-indigo-600 hover:text-indigo-500"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id || course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}