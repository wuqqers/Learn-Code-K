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

// Protected routes
router.use(protect); // Tüm rotaları koruma altına al

router.get('/', getCourses);
router.get('/:id', getCourse);
router.get('/:courseId/progress', getCourseProgress);
router.post('/progress', updateProgress);

// Admin only routes
router.post('/', restrictTo('admin'), createCourse);

export default router;