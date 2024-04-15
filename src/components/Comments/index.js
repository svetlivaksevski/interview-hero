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

  console.log(comments);

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

  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.comment}</p>

          <p>Author: {comment.userName}</p>
          <img src={comment.profileImage} width={50} />
          <button onClick={() => deleteComment(comment._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
