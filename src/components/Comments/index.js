"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Comments({ params, questionId, mutate }) {
  const { data: session } = useSession();

  const [editedCommentId, setEditedCommentId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const id = params;

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(`/api/comment/${questionId}`);
      const data = await res.json();
      setComments(data);
    };
    fetchComments();
  }, [comments, questionId]);

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
                <p className="add-comment">
                  posted at: {comment.created.substring(0, 10)}
                </p>
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
            {session && (
              <button
                className="buttons"
                onClick={() => handleLike(comment._id)}
              >
                Like {comment.likedByUserId.length}
              </button>
            )}
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
