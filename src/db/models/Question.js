import mongoose from "mongoose";

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
