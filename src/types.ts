export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  progress: {
    completedCourses: number;
    totalPoints: number;
    streak: number;
  };
}

export interface Course {
  _id?: string;
  id: string;
  title: string;
  description: string;
  level: CourseLevel;
  technology: string;
  duration: string;
  type: 'quiz' | 'dragdrop' | 'coding';
  objectives: string[];
  modules: Module[];
  progress?: number;
  isCompleted?: boolean;
}

export interface Exercise {
  type: 'quiz' | 'dragdrop' | 'coding';
  question: string;
  options?: string[];
  correctAnswer?: number; // string yerine number olarak değiştiriyoruz
  items?: string[];
  testCases?: TestCase[];
}

export interface Module {
  id: string;
  title: string;
  type: 'video' | 'article' | 'quiz';
  content: string;
  completed: boolean;
  videoUrl?: string;
  exercise?: Exercise;
}

export interface DragDropItem {
  id: string;
  content: string;
  category: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}