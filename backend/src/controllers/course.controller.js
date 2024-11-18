import { Course } from "../models/course.model.js";
import { Progress } from "../models/progress.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/appError.js";
import mongoose from "mongoose";

export const createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json({ success: true, course });
});

export const getCourseProgress = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const progressDoc = await Progress.findOne({
    user: req.user.id,
    course: courseId,
  });

  if (!progressDoc) {
    return res.json({
      success: true,
      data: {
        moduleAnswers: [],
        progress: 0,
        isCompleted: false,
      },
    });
  }

  res.json({
    success: true,
    data: progressDoc,
  });
});

export const getCourses = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find()
      .select('title description level thumbnail enrolledCount modules')
      .lean();
    
    if (!courses || courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No courses found'
      });
    }

    // Kullanıcı giriş yapmamışsa temel kurs bilgilerini döndür
    if (!req.user) {
      return res.json({
        success: true,
        data: courses.map(course => ({
          ...course,
          progress: 0,
          isCompleted: false,
          enrolledCount: course.enrolledCount || 0,
          modules: course.modules.map(module => ({
            title: module.title,
            description: module.description
          }))
        }))
      });
    }

    // Kullanıcı giriş yapmışsa progress bilgilerini ekle
    const progressList = await Progress.find({ 
      user: req.user._id,
      course: { $in: courses.map(c => c._id) }
    }).lean();

    const coursesWithProgress = courses.map(course => {
      const progress = progressList.find(p => 
        p.course.toString() === course._id.toString()
      );

      return {
        ...course,
        progress: progress?.progress || 0,
        isCompleted: progress?.isCompleted || false,
        completedModules: progress?.completedModules || []
      };
    });

    res.json({
      success: true,
      data: coursesWithProgress
    });
  } catch (error) {
    console.error('Error in getCourses:', error);
    throw new AppError('Error fetching courses', 500);
  }
});

export const getCourse = asyncHandler(async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      throw new AppError("Course not found", 404);
    }

    let progress = null;
    if (req.user) {
      progress = await Progress.findOne({
        user: req.user._id,
        course: course._id,
      });
    }

    res.json({
      success: true,
      data: {
        ...course.toObject(),
        progress: progress?.progress || 0,
        isCompleted:
          Boolean(progress?.isCompleted) || progress?.progress === 100,
        completedModules: progress?.completedModules || [],
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      throw new AppError("Invalid course ID", 400);
    }
    throw error;
  }
});

export const updateProgress = asyncHandler(async (req, res) => {
  const { courseId, moduleId, isCorrect, answer } = req.body;

  try {
    // Kullanıcı kontrolü
    if (!req.user || !req.user.id) {
      throw new AppError('User not authenticated', 401);
    }

    const calculatePoints = (level) => {
      switch (level.toLowerCase()) {
        case "beginner": return 50;
        case "intermediate": return 100;
        case "advanced": return 150;
        default: return 0;
      }
    };

    // Kurs ve progress bilgilerini al
    const [course, progressDoc] = await Promise.all([
      Course.findById(courseId),
      Progress.findOneAndUpdate(
        { 
          user: req.user.id,
          course: courseId 
        },
        { 
          $setOnInsert: { 
            user: req.user.id,
            course: courseId,
            completedModules: [],
            moduleAnswers: [],
            progress: 0,
            isCompleted: false
          }
        },
        { 
          upsert: true, 
          new: true 
        }
      )
    ]);

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    // Modül cevabını kaydet
    if (moduleId && (answer !== undefined || isCorrect !== undefined)) {
      const moduleAnswer = {
        moduleId,
        answer,
        isCorrect,
        attemptedAt: new Date(),
        pointsAwarded: false
      };

      const existingAnswerIndex = progressDoc.moduleAnswers.findIndex(
        (a) => a.moduleId.toString() === moduleId.toString()
      );

      if (existingAnswerIndex > -1) {
        progressDoc.moduleAnswers[existingAnswerIndex] = moduleAnswer;
      } else {
        progressDoc.moduleAnswers.push(moduleAnswer);
      }
    }

    // Progress hesaplama ve güncelleme
    let pointsToAdd = 0;
    if (moduleId && isCorrect) {
      const moduleIdStr = moduleId.toString();
      if (!progressDoc.completedModules.map(id => id.toString()).includes(moduleIdStr)) {
        progressDoc.completedModules.push(moduleId);
        
        const moduleAnswer = progressDoc.moduleAnswers.find(
          (a) => a.moduleId.toString() === moduleIdStr
        );
        
        if (!moduleAnswer?.pointsAwarded) {
          pointsToAdd = calculatePoints(course.level);
          if (moduleAnswer) {
            moduleAnswer.pointsAwarded = true;
          }
        }
      }
    }

    // Progress yüzdesini hesapla
    const newProgress = Math.round(
      (progressDoc.completedModules.length / course.modules.length) * 100
    );
    progressDoc.progress = newProgress;

    // Kurs tamamlanma kontrolü
    let courseCompleted = false;
    if (newProgress === 100 && !progressDoc.isCompleted) {
      progressDoc.isCompleted = true;
      progressDoc.completedAt = new Date();
      courseCompleted = true;
    }

    progressDoc.lastAccessed = new Date();

    // Tahmini öğrenme süresini hesapla (her modül için 15 dakika)
    const learningTimeInHours = 0.25; // 15 dakika = 0.25 saat

    // User güncellemesine hoursLearned ekle
    await User.findByIdAndUpdate(
      req.user.id,
      {
        $inc: {
          "progress.hoursLearned": learningTimeInHours
        }
      }
    );

    // Progress ve User güncellemelerini paralel yap
    const [savedProgress, updatedUser] = await Promise.all([
      progressDoc.save(),
      User.findByIdAndUpdate(
        req.user.id,
        {
          $inc: {
            "progress.totalPoints": pointsToAdd,
            "progress.completedCourses": courseCompleted ? 1 : 0
          }
        },
        { new: true }
      )
    ]);

    // Debug için log
    console.log('Progress saved:', {
      userId: req.user.id,
      courseId,
      moduleId,
      pointsAdded: pointsToAdd,
      newProgress,
      courseCompleted
    });

    res.json({
      success: true,
      data: {
        progress: savedProgress,
        totalPoints: updatedUser.progress.totalPoints
      }
    });

  } catch (error) {
    console.error("Progress save error:", error);
    throw new AppError(error.message || "Failed to save progress", 500);
  }
});
