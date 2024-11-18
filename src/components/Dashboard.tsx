import React, { useEffect, useState } from "react";
import { Trophy, Flame, BookOpen, Clock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext"; // Yolu düzeltildi
import { getCourses } from "../api/courses";
import { Course } from "../types";
import CourseCard from "../components/CourseCard"; // Yolu düzeltildi
import { courses as mockCourses } from "../data/mockData";

export default function Dashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedCoursesCount, setCompletedCoursesCount] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const backendCourses = await getCourses();
        console.log("Backend courses:", backendCourses); // Debug için

        // Mock kursları sadece development ortamında ekle
        const allCourses =
          process.env.NODE_ENV === "development"
            ? [...mockCourses, ...backendCourses]
            : backendCourses;

        // Tamamlanan kurs sayısını hesapla
        const completedCount = allCourses.filter((course) => {
          console.log(`Course ${course.title}:`, {
            isCompleted: course.isCompleted,
            progress: course.progress,
          }); // Debug için
          return Boolean(course.isCompleted) || course.progress === 100;
        }).length;

        setCourses(allCourses);
        setCompletedCoursesCount(completedCount);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="mt-2 text-gray-600">Continue your learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Trophy className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Points</p>
                <p className="text-xl font-semibold">
                  {user?.progress.totalPoints}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Flame className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Day Streak</p>
                <p className="text-xl font-semibold">
                  {user?.progress.streak} days
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Completed Courses</p>
                <p className="text-xl font-semibold">{completedCoursesCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Hours Learned</p>
                <p className="text-xl font-semibold">
                  {Math.round((user?.progress.hoursLearned || 0) * 10) / 10}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Continue Learning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              // _id veya id'yi key olarak kullan
              <CourseCard key={course._id || course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
