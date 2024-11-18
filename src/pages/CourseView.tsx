import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Course } from "../types";
import api from "../api/axios";
import { courses as mockCourses } from "../data/mockData";
import { AxiosError } from "axios";
import QuizModule from "../components/modules/Quizmodule";
import {
  BookOpen,
  CheckCircle,
  Circle,
  Play,
  Award,
  Clock,
  ChevronUp,
  ChevronDown,
  XCircle,
} from "lucide-react";

interface ModuleStatus {
  completed: boolean;
  isCorrect: boolean | null;
  attempted: boolean;
}

export default function CourseView() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [moduleStatuses, setModuleStatuses] = useState<
    Record<string, ModuleStatus>
  >({});
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);

  const currentModule = course?.modules[currentModuleIndex];

  const calculateProgress = () => {
    if (!course?.modules.length) return 0;

    const completedModules = course.modules.filter((module) => {
      const status = moduleStatuses[module.id];
      return status?.completed && status?.isCorrect;
    }).length;

    return Math.round((completedModules / course.modules.length) * 100);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const mockCourse = mockCourses.find(
          (c) => c.id === courseId || c._id === courseId
        );
        if (mockCourse) {
          // Mock veriler için id'leri garanti edelim
          const modulesWithIds = mockCourse.modules.map((module, index) => ({
            ...module,
            id: module.id || `mock-module-${index}`,
          }));
          setCourse({
            ...mockCourse,
            modules: modulesWithIds,
          });
          setLoading(false);
          return;
        }

        const response = await api.get(`/courses/${courseId}`);
        if (response.data.success) {
          // API verilerinde de id'leri kontrol edelim
          const modulesWithIds = response.data.data.modules.map(
            (module: any, index: number) => ({
              ...module,
              id: module.id || module._id || `api-module-${index}`,
            })
          );
          setCourse({
            ...response.data.data,
            modules: modulesWithIds,
          });
        } else {
          setError("Failed to load course data");
        }
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        console.error("Failed to fetch course:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load course"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const loadModuleAnswers = async () => {
      try {
        const response = await api.get(`/courses/${courseId}/progress`);
        if (response.data.success) {
          const { moduleAnswers } = response.data.data;

          const savedStatuses: Record<string, ModuleStatus> = {};
          moduleAnswers.forEach((answer: any) => {
            savedStatuses[answer.moduleId] = {
              completed: answer.isCorrect,
              isCorrect: answer.isCorrect,
              attempted: true,
            };
          });

          setModuleStatuses(savedStatuses);
        }
      } catch (error) {
        console.error("Failed to load module answers:", error);
      }
    };

    if (courseId) {
      loadModuleAnswers();
    }
  }, [courseId]);

  const handleQuizSubmit = async (moduleId: string, isCorrect: boolean, selectedAnswer: number) => {
    try {
      // Önce local state'i güncelle
      setModuleStatuses((prev) => ({
        ...prev,
        [moduleId]: {
          completed: isCorrect,
          isCorrect: isCorrect,
          attempted: true,
        },
      }));
  
      // Backend'e progress güncellemesi gönder
      const response = await api.post("/courses/progress", {
        courseId: course?._id || course?.id,
        moduleId: moduleId,
        isCorrect: isCorrect,
        answer: selectedAnswer, // Seçilen cevabı gönderiyoruz
      });
  
      console.log("Progress response:", response.data);
  
      if (isCorrect) {
        // Tüm modüllerin tamamlanıp tamamlanmadığını kontrol et
        const updatedStatuses = {
          ...moduleStatuses,
          [moduleId]: {
            completed: true,
            isCorrect: true,
            attempted: true,
          },
        };
  
        const allModulesCompleted = course?.modules.every(
          (module) => updatedStatuses[module.id]?.completed
        );
  
        if (allModulesCompleted) {
          setTimeout(() => {
            navigate("/dashboard", {
              state: {
                message: "Congratulations! You have completed the course.",
                courseId: course?._id || course?.id,
              },
            });
          }, 2000);
        } else if (currentModuleIndex < (course?.modules.length || 0) - 1) {
          setTimeout(() => {
            setCurrentModuleIndex((prev) => prev + 1);
          }, 1500);
        }
      }
  
      return response.data;
    } catch (error) {
      console.error("Failed to save module progress:", error);
      throw error;
    }
  };

  const getModuleStatus = (module: any, index: number) => {
    const status = moduleStatuses[module.id];

    if (status?.completed && status?.isCorrect) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }

    if (index === currentModuleIndex) {
      if (status?.attempted) {
        return status.isCorrect ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500" />
        );
      }
      return <Play className="h-5 w-5 text-indigo-500" />;
    }

    return <Circle className="h-5 w-5 text-gray-300" />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="text-center text-red-600 p-4">
        {error || "Course not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {course?.title}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {course?.technology} • {course?.level} Level
              </p>
            </div>
            <div className="flex items-center space-x-6">
              {isCourseCompleted && (
                <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <Award className="h-5 w-5 mr-2" />
                  <span className="font-medium">Course Completed!</span>
                </div>
              )}
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">
                  {course?.duration}
                </span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">
                  {course?.modules.length} Modules
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress()}%` }}
                    />
                  </div>
                  <span className="ml-3">{calculateProgress()}%</span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {course.modules.map((module, index) => (
                  <div
                    key={module.id || `module-${index}`} // Fallback olarak index kullanıyoruz
                    className={`p-4 transition-colors ${
                      index === currentModuleIndex
                        ? "bg-indigo-50"
                        : moduleStatuses[module.id]?.completed
                        ? "bg-green-50/50"
                        : ""
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {getModuleStatus(module, index)}
                      </div>
                      <div className="ml-3">
                        <p
                          className={`text-sm font-medium ${
                            index === currentModuleIndex
                              ? "text-indigo-700"
                              : moduleStatuses[module.id]?.completed &&
                                moduleStatuses[module.id]?.isCorrect
                              ? "text-green-700"
                              : "text-gray-900"
                          }`}
                        >
                          {module.title}
                        </p>
                        {moduleStatuses[module.id]?.attempted && (
                          <span
                            key={`status-${module.id || index}`} // Burada da fallback ekliyoruz
                            className={`text-xs ${
                              moduleStatuses[module.id]?.isCorrect
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {moduleStatuses[module.id]?.isCorrect
                              ? "✓ Completed"
                              : "✗ Try Again"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {currentModule && (
                <div className="p-6">
                  <div className="space-y-6">
                    {currentModule.videoUrl && (
                      <div>
                        <div className="relative pb-[56.25%] rounded-lg overflow-hidden bg-gray-900">
                          <iframe
                            src={currentModule.videoUrl}
                            className="absolute top-0 left-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )}

                    <div className="prose max-w-none">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        {currentModule.title}
                      </h2>
                      <div className="text-gray-600 leading-relaxed">
                        {currentModule.content}
                      </div>
                    </div>

                    {currentModule.exercise &&
                      currentModule.exercise.type === "quiz" && (
                        <div className="mt-8 pt-6 border-t border-gray-200">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Practice Quiz
                          </h3>
                          <div className="bg-gray-50 rounded-lg p-6">
                            <QuizModule
                              exercise={currentModule.exercise}
                              moduleId={currentModule.id}
                              isCompleted={currentModule.completed}
                              isLastModule={
                                currentModuleIndex ===
                                (course?.modules.length || 0) - 1
                              }
                              onComplete={(completed) =>
                                handleQuizSubmit(currentModule.id, completed)
                              }
                              onNextModule={() => {
                                if (
                                  currentModuleIndex ===
                                  (course?.modules.length || 0) - 1
                                ) {
                                  // Son modülse dashboard'a yönlendir
                                  navigate("/dashboard", {
                                    state: {
                                      message:
                                        "Congratulations! You have completed the course.",
                                      courseId: course?._id || course?.id,
                                    },
                                  });
                                } else {
                                  // Değilse sonraki modüle geç
                                  setCurrentModuleIndex((prev) => prev + 1);
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                }
                              }}
                            />
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
