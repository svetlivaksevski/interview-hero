"use client";

import useSWR from "swr";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { mutate } from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Comments({ params, questionId }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [date, setDate] = useState("");

  const id = params;
  const {
    data: comments,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/comment/${questionId}`, fetcher);

  useEffect(() => {
    if (comments) {
      comments.map((date) => {
        const createdDate = date.created;
        setDate(createdDate.substring(0, 10));
      });
    }
  }, [comments]);
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

  async function handleLike(id) {
    const response = await fetch(`/api/comment/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentId: id,
      }),
    });

    if (response.ok) {
      mutate();
    } else {
      console.error(response.status);
    }
  }

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
                <p className="add-comment">posted at: {date}</p>
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
            <button className="buttons" onClick={() => handleLike(comment._id)}>
              Like {comment.likedByUserId?.length}
            </button>
            {session?.user.userId === comment?.userId ? (
              <>
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
