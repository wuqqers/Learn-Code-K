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
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  technology: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['quiz', 'dragdrop', 'coding'],
    required: true,
  },
  objectives: [{
    type: String,
    required: true,
  }],
  modules: [moduleSchema],
});

export const Course = mongoose.model("Course", courseSchema);