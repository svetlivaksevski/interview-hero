"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import QuestionsForm from "../../../../components/Questionsform";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function EditPage({ params }) {
  const [loadingAddQuestion, setLoadingAddQuestion] = useState(false);
  const router = useRouter();

  const { id } = params;
  const {
    data: question,
    isLoading,
    error,
  } = useSWR(`/api/question/${id}`, fetcher);
  async function editQuestion(entriesData) {
    setLoadingAddQuestion(true);
    const response = await fetch(`/api/question/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entriesData),
    });

    if (response.ok) {
      router.push(`/question/${id}`);
    }
  }

  if (isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2>Edit Question</h2>
      <Link href={`/question/${id}`}>
        <p>back</p>
      </Link>
      <QuestionsForm
        onSubmit={editQuestion}
        formName={"edit-question"}
        defaultData={question}
        loadingAddQuestion={loadingAddQuestion}
        setLoadingAddQuestion={setLoadingAddQuestion}
      />
    </>
  );
}