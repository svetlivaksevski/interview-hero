"use client";

import { useState } from "react";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function CommentForm({ questionId }) {
  const { data: session } = useSession();
  // const [comment, setComment] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const trimmedComment = data.comment.trim();

    if (trimmedComment.length < 1) {
      return;
    }
    const commentWithUser = {
      comment: trimmedComment,
      userId: session.user.userId,
    };
    AddComment(commentWithUser);

    event.target.reset();
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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {session?.user.userId ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            name="comment"
            type="text"
            placeholder="Enter your comment..."
            className="comment-section"
            maxLength={500}
            required
          />

          <button type="submit" className="buttons">
            Submit
          </button>
        </form>
      ) : (
        <span className="comment-longin">
          <a onClick={() => signIn()}>
            To leave a comment, please click here to Sign in first.
          </a>
        </span>
      )}
    </>
  );
}
