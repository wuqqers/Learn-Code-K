import api from './axios';
import { Course } from '../types';
import { courses as mockCourses } from '../data/mockData';

export const getCourses = async (): Promise<Course[]> => {
  try {
    const response = await api.get('/courses');
    
    if (response.data.success) {
      console.log('Backend response:', response.data);
      return response.data.data;
    }
    
    throw new Error('Failed to fetch courses');
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
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