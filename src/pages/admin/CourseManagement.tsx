import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import CourseForm from '../../components/admin/CourseForm';
import { Course } from '../../types';
import api from '../../api/axios';

export default function CourseManagement() {
  const [showForm, setShowForm] = useState(false);
  const [managedCourses, setManagedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/courses');
        setManagedCourses(data.data || []);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCreateCourse = async (course: Partial<Course>) => {
    try {
      const { data } = await api.post('/courses', course);
      
      const newCourse = {
        ...data.course,
        progress: 0,
        modules: course.modules || []
      } as Course;
      
      setManagedCourses(prev => [...prev, newCourse]);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create course:', error);
      alert('Failed to create course. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Create Course
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
          <CourseForm onSubmit={handleCreateCourse} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {managedCourses.length === 0 ? (
            <p className="text-gray-500 col-span-3 text-center py-8">
              No courses available. Create your first course!
            </p>
          ) : (
            managedCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <span className={`px-2 py-1 rounded text-sm ${
                    course.type === 'quiz' ? 'bg-blue-100 text-blue-800' :
                    course.type === 'dragdrop' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {course.type === 'quiz' ? 'Quiz' :
                     course.type === 'dragdrop' ? 'Drag & Drop' :
                     'Coding'}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Learning Objectives:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {course.objectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900">Course Details:</h4>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Level: {course.level}</p>
                    <p>Technology: {course.technology}</p>
                    <p>Duration: {course.duration}</p>
                    <p>Modules: {course.modules?.length || 0}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}