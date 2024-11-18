import api from './axios';
import { Course } from '../types';

export const getCourses = async (): Promise<Course[]> => {
  const response = await api.get('/courses');
  console.log('API Response:', response.data);
  
  return response.data.data.map((course: any) => ({
    ...course,
    progress: course.progress || 0,
    isCompleted: Boolean(course.isCompleted) || course.progress === 100
  }));
};

export const getCourse = async (id: string): Promise<Course> => {
  const { data } = await api.get(`/courses/${id}`);
  return {
    ...data.data,
    progress: data.data.progress || 0,
    isCompleted: Boolean(data.data.isCompleted) || data.data.progress === 100
  };
};

export const updateProgress = async (courseId: string, moduleId: string, completed: boolean, answer?: any, isCorrect?: boolean) => {
  const { data } = await api.post('/courses/progress', {
    courseId,
    moduleId,
    completed,
    answer,
    isCorrect
  });
  return data.data;
};