import mongoose from "mongoose";
const quizSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    course: { type: String, required: true },
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
      enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
      default: "Graded Quiz",
    },
    assignmentGroup: {
      type: String,
      enum: ["Quizzes", "Exams", "Assignments", "Project"],
      default: "Quizzes"
    },
    shuffle: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    showCorrectAnswers: Boolean,
    accessCode: { type: String, default: ''},
    oneQuestionATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestions: { type: Boolean, default: false },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'questions'}]
  },
  { collection: "quizzes" }
);
export default quizSchema;
