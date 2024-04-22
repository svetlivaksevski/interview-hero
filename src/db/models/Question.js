import mongoose from "mongoose";

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    profileImage: { type: String },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    userName: { type: String },
    ratedByUserId: {
      rating: { type: Number, required: true, min: 1, max: 5 },
      userId: { type: Schema.Types.ObjectId, ref: "User" },
    },
  },
  {
    timestamps: true,
  }
);
const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
