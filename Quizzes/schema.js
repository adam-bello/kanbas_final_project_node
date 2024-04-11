import mongoose from "mongoose";
const quizSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: String,
    points: { type: Number, required: true },
    numQuestions: { type: Number, required: true },
    startDate: Date,
    dueDate: Date,
    availableUntil: Date,
    published: Boolean,
    assignedTo: String,
    quizType: {
      type: String,
      enum: ["Graded Quiz"],
      default: "Graded Quiz",
    },
    assignmentGroup: String,
    shuffle: Boolean,
    timeLimit: Number,
    multipleAttempts: Boolean,
    showCorrectAnswers: Boolean,
    accessCode: String,
    oneQuestionATime: Boolean,
    webcamRequired: Boolean,
    lockQuestions: Boolean,
  },
  { collection: "quizzes" }
);
export default quizSchema;
