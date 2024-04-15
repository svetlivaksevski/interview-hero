"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CommentForm({ questionId }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const comment = Object.fromEntries(formData);
    AddComment(comment);
  };

  async function AddComment(entryData) {
    console.log("data", entryData);
    try {
      const response = await fetch(`/api/comment/${questionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entryData),
      });
      if (!response.ok) {
        throw new Error("Error submitting comment");
      }
      setComment("");
    } catch (error) {
      console.error(error);
    }
  }

  // async function deleteComment() {
  //   const response = await fetch(`/api/comment/${id}`, {
  //     method: "DELETE",
  //   });
  //   if (response.ok) {
  //     router.push("/question");
  //   } else {
  //     console.error(response.status);
  //   }
  // }
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="comment"
        type="text"
        placeholder="Enter your comment"
        required
      />
      {/* <button onClick={deleteComment}>Delete</button> */}
      <button type="submit">Submit</button>
    </form>
  );
}
