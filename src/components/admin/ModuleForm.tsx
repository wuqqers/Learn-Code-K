import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Module } from "../../types";
import { courseTemplates } from "../../data/courseTemplates";

interface ModuleFormProps {
  courseType: "quiz" | "dragdrop" | "coding";
  technology: string;
  moduleNumber: number;
  onSubmit: (module: Partial<Module>) => void;
  onCancel: () => void;
}

export default function ModuleForm({
  courseType,
  technology,
  moduleNumber,
  onSubmit,
  onCancel,
}: ModuleFormProps) {
  const template = courseTemplates[technology]?.modules[moduleNumber - 1];

  const [module, setModule] = useState<Partial<Module>>({
    title: template?.title || `${technology} ${moduleNumber}. Module`,
    type: "video",
    content: template?.content || "",
    completed: false,
    videoUrl: template?.videoUrl || "",
    exercise: {
      type: courseType,
      question: template?.exercises[courseType]?.question || "",
      options:
        courseType === "quiz"
          ? template?.exercises.quiz?.options || ["", "", "", ""]
          : undefined,
      items:
        courseType === "dragdrop"
          ? template?.exercises.dragdrop?.items || []
          : undefined,
      testCases:
        courseType === "coding"
          ? template?.exercises.coding?.testCases || []
          : undefined,
      correctAnswer:
        courseType === "quiz"
          ? template?.exercises.quiz?.correctAnswer
          : undefined,
    },
  });

  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const validateVideoUrl = (url: string) => {
    if (!url) return true;
    const videoId = getYouTubeVideoId(url);
    return videoId !== null;
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (module.videoUrl && !validateVideoUrl(module.videoUrl)) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    const videoId = module.videoUrl ? getYouTubeVideoId(module.videoUrl) : null;
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : "";

    onSubmit({
      ...module,
      videoUrl: embedUrl,
    });
  };

  const addTestCase = () => {
    const testCases = [...(module.exercise?.testCases || [])];
    testCases.push({
      input: "",
      expectedOutput: "",
      description: "",
    });
    setModule({
      ...module,
      exercise: { ...module.exercise!, testCases },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Module Title
        </label>
        <input
          type="text"
          required
          value={module.title}
          onChange={(e) => setModule({ ...module, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          required
          value={module.content}
          onChange={(e) => setModule({ ...module, content: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Video URL (YouTube)
        </label>
        <input
          type="text"
          value={module.videoUrl}
          onChange={(e) => setModule({ ...module, videoUrl: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Exercise Question
        </label>
        <input
          type="text"
          required
          value={module.exercise?.question || ""}
          onChange={(e) =>
            setModule({
              ...module,
              exercise: { ...module.exercise!, question: e.target.value },
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {courseType === "quiz" && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Options
          </label>
          {module.exercise?.options?.map((option, index) => (
            <div key={index} className="mt-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={Number(module.exercise?.correctAnswer) === index}
                  onChange={() =>
                    setModule({
                      ...module,
                      exercise: {
                        ...module.exercise!,
                        correctAnswer: index,
                      },
                    })
                  }
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <input
                  type="text"
                  required
                  value={option}
                  onChange={(e) => {
                    const options = [...(module.exercise?.options || [])];
                    options[index] = e.target.value;
                    setModule({
                      ...module,
                      exercise: { ...module.exercise!, options },
                    });
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder={`Option ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add Module
        </button>
      </div>
    </div>
  );
}