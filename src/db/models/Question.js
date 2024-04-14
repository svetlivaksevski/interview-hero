import mongoose from "mongoose";
// import "./Comment";

const { Schema } = mongoose;

const questionSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  created: { type: Date, default: Date.now },
  // userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
