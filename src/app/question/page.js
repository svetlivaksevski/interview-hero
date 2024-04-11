"use client";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function QuestionPage({ params }) {
  const { id } = params;
  const { data, error, isLoading } = useSWR(`/api/question/${id}`, fetcher);
  console.log(data);
  if (error) return <div>{`Failed to load :(`}</div>;
  if (isLoading) return <div>Loading Question...</div>;

  return (
    <>
      <a href="/">
        <p>back</p>
      </a>
      <div>
        <p>{data.question}</p>
        <p>{data.answer}</p>
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
    </>
  );
}
