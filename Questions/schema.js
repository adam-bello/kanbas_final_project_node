import mongoose from "mongoose";
const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    points: { type: Number, required: true },
    question: { type: String, required: true },
    type: { type: String,
            enum: ["multiple_choice", "true_false", "fill_in_the_blanks"],
            default: "multiple_choice"},
    choices: [{ type: String }], // a list of string for true/false + multiple choice (can be empty for fill in the blank)
    correct_answers: [{ type: String }] // a single string for tf + multiple choice, an ordered list of strings for fill in the blank
  },
  { collection: "questions" }
);
export default questionSchema;
