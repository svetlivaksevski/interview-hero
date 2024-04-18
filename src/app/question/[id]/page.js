"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
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
  const { data, error } = useSWR(`/api/question/${id}`, fetcher);

  if (error) return <div>{`Failed to load :(`}</div>;
  if (!data) return;

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

  const onlyDate = data.createdAt.substring(0, 10);

  const getCategoryColor = (data) => {
    switch (data.difficulty) {
      case "Easy":
        return "#A1DE93";
      case "Medium":
        return "#F7F48B";
      case "Hard":
        return "#F47C7C";
      default:
        return "white";
    }
  };

  const color = getCategoryColor(data);

  return (
    <>
      <Header />
      <div className="container-questions">
        <div className="questions-data">
          <h2>Your question:</h2>
          <p>{data.question}</p>
          <h2>Your answer:</h2>
          <p>{data.answer}</p>
          <h3>Question category:</h3>
          <p>{data.category}</p>
          <h3>How challenging was this question to answer?</h3>
          <p style={{ backgroundColor: color }}>{data.difficulty}</p>
          <div className="dots"></div>
          <div className="user-info">
            <p>Posted by {data.userName}</p>

            <p>Created: {onlyDate}</p>
          </div>
          <div className="buttons-question">
            {session?.user.userId === data?.userId ? (
              <>
                <Link href={`/question/${id}/edit`} className="buttons">
                  Edit question
                </Link>
                <button onClick={deleteQuestion} className="buttons">
                  Delete
                </button>
              </>
            ) : (
              <p></p>
            )}
          </div>
        </div>

        <Comments questionId={id} />
        <CommentForm questionId={id} />
      </div>
      <Navigation />
    </>
  );
}
