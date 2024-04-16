"use client";

import { useState } from "react";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CommentForm({ questionId }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const router = useRouter();
  const handleSubmit = (event) => {
    const formData = new FormData(event.target);
    const comment = Object.fromEntries(formData);
    const commentWithUser = { ...comment, userId: session.user.userId };
    AddComment(commentWithUser);
  };
  async function AddComment(entryData) {
    try {
      const response = await fetch(`/api/comment/${questionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entryData),
      });

      if (response.ok) {
        mutate(`/question/${questionId}`);
      }

      if (!response.ok) {
        throw new Error("Error submitting comment");
      }
      setComment("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        name="comment"
        type="text"
        placeholder="Enter your comment..."
        className="comment-section"
        required
      />

      <button type="submit" className="buttons">
        Submit
      </button>
    </form>
  );
}
