import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  completedModules: [{
    type: mongoose.Schema.Types.ObjectId
  }],
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  moduleAnswers: [{
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    answer: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean,
    pointsAwarded: Boolean, // Puan verilip verilmediğini takip etmek için
    attemptedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

progressSchema.index({ user: 1, course: 1 }, { unique: true });

export const Progress = mongoose.model('Progress', progressSchema);