import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { AppError } from '../utils/appError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// me endpoint'i ekleyelim
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  // Streak kontrolü
  const lastLogin = user.progress.lastLoginDate;
  const today = new Date();
  const diffTime = Math.abs(today - lastLogin);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Streak güncelleme
  if (diffDays > 1) {
    user.progress.streak = 0;
    user.progress.lastLoginDate = today;
    await user.save();
  }

  res.json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      progress: {
        completedCourses: user.progress.completedCourses || 0,
        totalPoints: user.progress.totalPoints || 0,
        streak: user.progress.streak || 0,
        hoursLearned: user.progress.hoursLearned || 0,
        lastLoginDate: user.progress.lastLoginDate
      }
    }
  });
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError('User already exists', 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    role: 'user',
    progress: {
      completedCourses: 0,
      totalPoints: 0,
      streak: 1,
      hoursLearned: 0,
      lastLoginDate: new Date()
    }
  });

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      progress: {
        completedCourses: user.progress.completedCourses || 0,
        totalPoints: user.progress.totalPoints || 0,
        streak: user.progress.streak || 1,
        hoursLearned: user.progress.hoursLearned || 0,
        lastLoginDate: user.progress.lastLoginDate
      }
    }
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid credentials', 401);
  }

  // Streak hesaplama
  const lastLogin = user.progress.lastLoginDate;
  const today = new Date();
  const diffTime = Math.abs(today - lastLogin);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Streak güncelleme
  if (diffDays === 1) {
    user.progress.streak += 1;
  } else if (diffDays > 1) {
    user.progress.streak = 1;
  } else if (diffDays === 0) {
    // Aynı gün içinde tekrar giriş - streak'i koru
  }
  
  user.progress.lastLoginDate = today;
  await user.save();

  const token = generateToken(user._id);

  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      progress: {
        completedCourses: user.progress.completedCourses || 0,
        totalPoints: user.progress.totalPoints || 0,
        streak: user.progress.streak || 0,
        hoursLearned: user.progress.hoursLearned || 0,
        lastLoginDate: user.progress.lastLoginDate
      }
    }
  });
});