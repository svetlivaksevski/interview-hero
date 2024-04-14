"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Navigation from "../../../components/Navigation";
import Header from "../../../components/Header";
import Comments from "@/components/Comments";
import CommentForm from "@/components/CommentForm";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function QuestionPage({ params }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = params;
  const { data, error, isLoading } = useSWR(`/api/question/${id}`, fetcher);

  if (error) return <div>{`Failed to load :(`}</div>;
  if (isLoading) return <div>Loading Question...</div>;

  async function deleteQuestion() {
    const response = await fetch(`/api/question/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/question");
    } else {
      console.error(response.status);
    }
  }

  console.log(data);
  return (
    <>
      <Header />
      <div>
        <h2>Your question:</h2>
        <p>{data.question}</p>
        <h2>Your answer:</h2>
        <p>{data.answer}</p>
        <button onClick={signIn}>SignIn</button>
        <button onClick={signOut}>SignOut</button>
        {session && (
          <>
            <Link href={`/question/${id}/edit`}>Edit</Link>
            <button onClick={deleteQuestion}>Delete</button>
          </>
        )}
      </div>

      <Comments questionId={id} comments={data?.comments || []} />
      <CommentForm questionId={id} comments={data?.comments || []} />

      <Navigation />
    </>
  );
}
