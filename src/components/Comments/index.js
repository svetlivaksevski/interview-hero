"use client";

import useSWR from "swr";
import { useRouter } from "next/navigation";
// import { useSession, signIn, signOut } from "next-auth/react";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Comments({ params, questionId }) {
  // const { data: session } = useSession();
  const router = useRouter();
  // console.log("result", questionId);
  const id = params;
  const {
    data: comments,
    error,
    isLoading,
  } = useSWR(`/api/comment/${questionId}`, fetcher);

  if (error) return <div>{`Failed to load :(`}</div>;
  if (isLoading) return <div>Loading Question...</div>;

  async function deleteComment(id) {
    console.log("IDDDD", id);
    const response = await fetch(`/api/comment/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push(`/question/${questionId}`);
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
                <p className="add-comment">added on {onlyDate}</p>
              </div>
            </div>
            <p>{comment.comment}</p>
            <div className="dots"></div>
            <button
              onClick={() => deleteComment(comment._id)}
              className="buttons"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
