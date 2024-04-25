"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  LiaEdit,
  LiaTrashAltSolid,
  LiaCommentSlashSolid,
  LiaHeart,
  LiaHeartSolid,
  LiaAngleDownSolid,
} from "react-icons/lia";

export default function Comments({ params, questionId, mutate }) {
  const { data: session } = useSession();

  const [editedCommentId, setEditedCommentId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [displayCount, setDisplayCount] = useState(5);

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
    const trimmedCommentText = commentText.trim();
    if (!editedCommentId || !trimmedCommentText) return;

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

  function handleCancelEdit() {
    setEditedCommentId(null);
    setCommentText("");
  }

  const handleShowMore = () => {
    setDisplayCount(displayCount + 5);
  };

  return (
    <div>
      <div className="comments-container">
        <h2 className="comment-text">Comments</h2>

        {comments.length === 0 ? (
          <span className="first-comment">
            Be the first to comment!
            <LiaCommentSlashSolid fontSize={40} fill="#2b7a78" />
          </span>
        ) : (
          comments.slice(0, displayCount).map((comment) => (
            <div key={comment._id} className="comments-container-content">
              <div className="comment-profile-info">
                {comment.userId === session.user.userId ? (
                  <a href="/profile">
                    <img
                      src={comment.profileImage}
                      width={50}
                      className="imagecomment"
                      alt="profile-photo"
                    />
                  </a>
                ) : (
                  <img
                    src={comment.profileImage}
                    width={50}
                    className="imagecomment"
                    alt="profile-photo"
                  />
                )}
                <div className="p-comment">
                  <div className="author">{comment.userName}</div>
                  <div className="add-comment">
                    posted at: {comment.created.substring(0, 10)}
                  </div>
                </div>
              </div>
              <div>
                {editedCommentId === comment._id ? (
                  <textarea
                    defaultValue={comment.comment}
                    onChange={(e) => setCommentText(e.target.value.trim())}
                    maxLength={500}
                    minLength={2}
                    className="edit-textarea"
                  />
                ) : (
                  comment.comment
                )}
                {editedCommentId === comment._id && (
                  <div>
                    <button
                      onClick={() => handleSaveEdit(comment._id)}
                      className="buttons"
                    >
                      Save
                    </button>
                    <button onClick={handleCancelEdit} className="buttons">
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="dots"></div>
              <div className="comment-icons">
                {session && (
                  <button
                    className="icons"
                    onClick={() => handleLike(comment._id)}
                  >
                    {comment.likedByUserId.includes(session.user.userId) ? (
                      <LiaHeartSolid fontSize={20} />
                    ) : (
                      <LiaHeart fontSize={20} />
                    )}
                    <span className="number-likes">
                      {comment.likedByUserId.length}
                    </span>
                  </button>
                )}
                {session?.user.userId === comment?.userId ? (
                  <>
                    <button
                      onClick={() => setEditedCommentId(comment._id)}
                      className={
                        editedCommentId === comment._id
                          ? "icons disabled"
                          : "icons"
                      }
                      disabled={editedCommentId === comment._id}
                    >
                      <LiaEdit fontSize={20} />
                    </button>
                    <button
                      onClick={() => deleteComment(comment._id)}
                      className="icons"
                    >
                      <LiaTrashAltSolid fontSize={20} />
                    </button>
                    {comment.length > displayCount && (
                      <span className="showmore" onClick={handleShowMore}>
                        Show more
                        <LiaAngleDownSolid />
                      </span>
                    )}
                  </>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
