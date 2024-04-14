"use client";

import useSWR from "swr";
import { useRouter } from "next/navigation";
// import { useSession, signIn, signOut } from "next-auth/react";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Comments({ params, comments }) {
  // const { data: session } = useSession();
  const router = useRouter();
  // const { id } = params;
  // const { data, error, isLoading } = useSWR(`/api/comment/${id}`, fetcher);

  // if (error) return <div>{`Failed to load :(`}</div>;
  // if (isLoading) return <div>Loading Question...</div>;

  return (
    <div>
      <h2>Comments</h2>
      {/* {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.content}</p>
          <p>Author: {comment.author.name}</p>
        </div>
      ))} */}
    </div>
  );
}
