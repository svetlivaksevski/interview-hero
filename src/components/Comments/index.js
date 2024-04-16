"use client";

import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Comments({ params, questionId }) {
  const { data: session } = useSession();
  const router = useRouter();

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

  async function editComment(id) {
    const response = await fetch(`/api/comment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });

    if (response.ok) {
      mutate();
    } else {
      console.error(response.status);
    }
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
            <p>{comment.comment}</p>
            <div className="dots"></div>
            {session?.user.userId === comment?.userId ? (
              <>
                <button
                  onClick={() => editComment(comment._id)}
                  className="buttons"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteComment(comment._id)}
                  className="buttons"
                >
                  Delete
                </button>

                {editComment === comment._id ? (
                  <div>
                    <textarea
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                    />
                    <button onClick={() => editComment(comment._id)}>
                      Save
                    </button>
                  </div>
                ) : (
                  <p>{comment.comment}</p>
                )}
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
