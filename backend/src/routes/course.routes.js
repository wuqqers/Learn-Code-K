import express from 'express';
import { protect, restrictTo } from '../middleware/auth.middleware.js';
import { 
  getCourses, 
  getCourse,
  getCourseProgress,
  createCourse, 
  updateProgress 
} from '../controllers/course.controller.js';

const router = express.Router();

// Public routes
router.get('/', getCourses);

// Protected routes
router.get('/:id', protect, getCourse);
router.get('/:courseId/progress', protect, getCourseProgress);
router.post('/progress', protect, updateProgress);

// Admin only routes
router.post('/', protect, restrictTo('admin'), createCourse);

export default router;