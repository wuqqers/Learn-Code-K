interface Progress {
  completedCourses: number;
  totalPoints: number;
  streak: number;
  hoursLearned: number;
  lastLoginDate: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  progress: Progress;
} 