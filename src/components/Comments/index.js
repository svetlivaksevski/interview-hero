"use client";

import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Comments({ params, questionId }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [likes, setLikes] = useState(0);

  const id = params;
  const {
    data: comments,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/comment/${questionId}`, fetcher);

  if (error) return <div>{`Failed to load :(`}</div>;
  if (!comments) return;

  async function deleteComment(id) {
    const response = await fetch(`/api/comment/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      mutate();
    } else {
      console.error(response.status);
    }
  }

  async function handleSaveEdit(id) {
    if (!editedCommentId) return;

    const response = await fetch(`/api/comment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: commentText,
      }),
    });

    if (response.ok) {
      setEditedCommentId(null);
      setCommentText("");
      mutate();
    } else {
      console.error(response.status);
    }
  }

  function handleLike() {
    setLikes(likes + 1);
  }

  let onlyDate;

  comments.forEach((date) => {
    const createdDate = date.created;
    onlyDate = createdDate.substring(0, 10);
  });

  return (
    <div>
      <div className="comments-container">
        <h2>Comments</h2>
        {comments.map((comment) => (
          <div key={comment._id} className="comments-container-content">
            <div className="comment-profile-info">
              <img
                src={comment.profileImage}
                width={50}
                className="imagecomment"
              />
              <div className="p-comment">
                <p className="author">{comment.userName}</p>
                <p className="add-comment">posted at: {onlyDate}</p>
              </div>
            </div>
            <p>
              {editedCommentId === comment._id ? (
                <textarea
                  defaultValue={comment.comment}
                  onChange={(e) => setCommentText(e.target.value)}
                  maxLength={250}
                  minLength={2}
                />
              ) : (
                comment.comment
              )}
              {editedCommentId === comment._id && (
                <button
                  onClick={() => handleSaveEdit(comment._id)}
                  className="buttons"
                  disabled={commentText.trim().length === 0}
                >
                  Save
                </button>
              )}
            </p>
            <div className="dots"></div>
            {session?.user.userId === comment?.userId ? (
              <>
                <button className="buttons" onClick={handleLike}>
                  Like {likes}
                </button>
                <button
                  onClick={() => setEditedCommentId(comment._id)}
                  className={
                    editedCommentId === comment._id
                      ? "buttons disabled"
                      : "buttons"
                  }
                  disabled={editedCommentId === comment._id}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteComment(comment._id)}
                  className="buttons"
                >
                  Delete
                </button>
              </>
            ) : (
              <p></p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
