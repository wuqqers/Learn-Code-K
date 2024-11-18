import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['video', 'article', 'quiz'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  exercise: {
    type: {
      type: String,
      enum: ['quiz', 'dragdrop', 'coding'],
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [String],
    correctAnswer: Number,
    items: [String],
    testCases: [{
      input: String,
      expectedOutput: String,
      description: String,
    }],
  },
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Kurs başlığı zorunludur'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Kurs açıklaması zorunludur']
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  thumbnail: String,
  enrolledCount: {
    type: Number,
    default: 0
  },
  modules: [{
    title: String,
    description: String,
    content: String,
    exercise: {
      type: {
        type: String,
        enum: ['quiz', 'coding']
      },
      question: String,
      options: [String],
      correctAnswer: Number
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Course = mongoose.model("Course", courseSchema);