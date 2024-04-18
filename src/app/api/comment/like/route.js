import Comment from "@/db/models/Comment";
import dbConnect from "@/db/connect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { commentId, userId } = req.body;

    try {
      await dbConnect();

      const comment = await Comment.findById(commentId);

      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      const likedIndex = comment.likes.indexOf(userId);

      if (likedIndex !== -1) {
        comment.likes.splice(likedIndex, 1);
      } else {
        comment.likes.push(userId);
      }

      await comment.save();

      return res.status(200).json({ message: "Like updated successfully" });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // Handle other HTTP methods
    return res.status(405).json({ error: "Method not allowed" });
  }
}
