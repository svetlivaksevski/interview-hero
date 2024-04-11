"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Navigation from "../../components/Navigation";
import Header from "../../components/Header/";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function QuestionPage({ params }) {
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

  return (
    <>
      <Header />
      <div>
        <h2>Your question:</h2>
        <p>{data.question}</p>
        <h2>Your answer:</h2>
        <p>{data.answer}</p>
        <Link href={`/question/${id}/edit`}>Edit</Link>
        <button onClick={deleteQuestion}>Delete</button>
      </div>

      {/* Comments section */}
      {/* <Comments questionId={id} comments={data?.comments || []} /> */}

      {/* <Link href={`/places/${id}/edit`} passHref legacyBehavior>
          <StyledLink>Edit</StyledLink>
        </Link>
        <StyledButton onClick={deletePlace} type="button" variant="delete">
          Delete
        </StyledButton>
      </ButtonContainer> */}

      {/* Uncomment and implement delete functionality if needed */}
      <Navigation />
    </>
  );
}
