import React, { useState, useEffect } from "react";
import { Exercise } from "../../types";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizModuleProps {
  exercise: Exercise;
  moduleId: string;
  isCompleted: boolean;
  onComplete: (completed: boolean, answer: number) => Promise<{ totalPoints?: number }>;
  onNextModule?: () => void;
  isLastModule?: boolean;
}

export default function QuizModule({
  exercise,
  moduleId,
  isCompleted,
  onComplete,
  onNextModule,
  isLastModule, // Yeni prop'u alıyoruz
}: QuizModuleProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState<number | null>(null);

  useEffect(() => {
    const resetStates = () => {
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
      setEarnedPoints(null);
    };

    resetStates();
    return () => resetStates();
  }, [moduleId, exercise]);

  const handleSubmit = async () => {
    if (selectedAnswer === null) return;

    const isAnswerCorrect = selectedAnswer === Number(exercise.correctAnswer);
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);

    try {
      const response = await onComplete(isAnswerCorrect, selectedAnswer); // selectedAnswer'ı da gönderiyoruz

      if (isAnswerCorrect && response?.totalPoints) {
        setEarnedPoints(response.totalPoints);
      }
    } catch (error) {
      console.error("Failed to submit answer:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium text-gray-900">
        {exercise.question}
      </div>

      <div className="space-y-3">
        {exercise.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => !showResult && setSelectedAnswer(index)}
            disabled={showResult || isCompleted}
            className={`w-full flex items-center p-4 rounded-lg border-2 transition-all ${
              showResult
                ? index === Number(exercise.correctAnswer)
                  ? "border-green-500 bg-green-50 text-green-700"
                  : index === selectedAnswer
                  ? "border-red-500 bg-red-50 text-red-700"
                  : "border-gray-200 bg-white text-gray-500"
                : selectedAnswer === index
                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                : "border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50"
            }`}
          >
            <span className="flex-1 text-left">{option}</span>
            {showResult && index === Number(exercise.correctAnswer) && (
              <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
            )}
            {showResult &&
              index === selectedAnswer &&
              index !== Number(exercise.correctAnswer) && (
                <XCircle className="h-5 w-5 text-red-500 ml-2" />
              )}
          </button>
        ))}
      </div>

      {!showResult && !isCompleted && (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium
                   hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Submit Answer
        </button>
      )}

      {showResult && (
        <div
          className={`p-4 rounded-lg ${
            isCorrect
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <div className="flex items-center">
            {isCorrect ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <div>
                  <p className="font-medium text-green-700">
                    Correct! You can proceed to the next module.
                  </p>
                  {earnedPoints && (
                    <p className="text-sm text-green-600 mt-1">
                      You earned +{earnedPoints} points!
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
                <div>
                  <p className="font-medium text-red-700">
                    Incorrect. Try again!
                  </p>
                  <p className="text-sm text-red-600 mt-1">
                    We've highlighted the correct answer. Review and try again.
                  </p>
                </div>
              </>
            )}
          </div>
          {/* Next Module butonu */}
          {isCorrect && onNextModule && (
            <button
              onClick={onNextModule}
              className="mt-4 w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium
                 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                 transition-colors flex items-center justify-center"
            >
              <span>{isLastModule ? "Finish Course" : "Next Module"}</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isLastModule
                      ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" // checkmark circle icon
                      : "M9 5l7 7-7 7" // arrow right icon
                  }
                />
              </svg>
            </button>
          )}
        </div>
      )}

      {isCompleted && !showResult && (
        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-gray-500 mr-2" />
            <p className="font-medium text-gray-700">
              You have already completed this module.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
