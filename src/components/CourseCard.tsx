import React from "react";
import { Play, Book, Code } from "lucide-react";
import { Course } from "../types";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate();
  
  const progress = course.progress || 0;
  const isCompleted = Boolean(course.isCompleted) || progress === 100;
  
  console.log(`Course ${course.title}:`, {
    progress,
    isCompleted,
    courseData: course,
    completedModules: course.completedModules,
    moduleAnswers: course.moduleAnswers
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const truncateDescription = (text: string, maxLength: number = 500) => {
    if (text.length <= maxLength) return text;
    const truncated = text.slice(0, maxLength);
    const lastPeriodIndex = truncated.lastIndexOf(".");
    return lastPeriodIndex > 0 ? truncated.slice(0, lastPeriodIndex + 1) : truncated.trim() + "...";
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />;
      case "article":
        return <Book className="h-4 w-4" />;
      case "interactive":
        return <Code className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleStartCourse = () => {
    navigate(`/courses/${course._id || course.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col min-h-[400px]">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
              course.level
            )}`}
          >
            {course.level}
          </span>
          <span className="text-sm text-gray-500">{course.duration}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 overflow-hidden text-ellipsis">
          {truncateDescription(course.description, 500)}
        </p>

        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isCompleted ? "bg-green-500" : "bg-indigo-600"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-gray-500 mt-1">
            {isCompleted ? "Completed" : `${progress}% complete`}
          </span>
        </div>

        <div className="space-y-2 mb-6">
          {course.modules.map((module, index) => (
            <div
              key={module.id || `module-${index}`}
              className="flex items-center text-sm"
            >
              <span
                className={`mr-2 ${
                  module.completed ? "text-green-500" : "text-gray-400"
                }`}
              >
                {getIcon(module.type)}
              </span>
              <span
                className={
                  module.completed
                    ? "text-gray-400 line-through"
                    : "text-gray-700"
                }
              >
                {module.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto p-6 pt-0">
        <button
          onClick={handleStartCourse}
          disabled={isCompleted}
          className={`w-full py-2 px-4 rounded-md transition-colors duration-300 ${
            isCompleted
              ? "bg-green-500 text-white cursor-not-allowed opacity-75"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {isCompleted
            ? "Course Completed"
            : progress > 0
            ? "Continue Learning"
            : "Start Course"}
        </button>
      </div>
    </div>
  );
}