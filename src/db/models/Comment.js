import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const { Schema } = mongoose;
const commentSchema = new Schema({
  userName: { type: String },
  profileImage: { type: String },
  questionId: { type: Schema.Types.ObjectId, ref: "Question" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  created: { type: Date, default: Date.now },
  comment: { type: String, required: true },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;
