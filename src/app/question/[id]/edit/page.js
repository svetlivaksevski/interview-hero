"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import QuestionsForm from "../../../../components/Questionsform";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function EditPage({ params }) {
  const [loadingAddQuestion, setLoadingAddQuestion] = useState(false);
  const [failedSubmission, setfailedSubmission] = useState("");
  const [successEdit, setSuccessEdit] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const session = useSession();
  const { id } = params;
  const {
    data: question,
    isLoading,
    error,
  } = useSWR(`/api/question/${id}`, fetcher);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoadingAddQuestion(true);
    const formData = new FormData(event.target);
    const entryData = Object.fromEntries(formData);

    if (entryData.category === "No category assigned") {
      setLoadingAddQuestion(false);
      setErrorMessage("Please select a category.");
      return;
    }
    const questionWithUser = { ...entryData, userId: session.data.user.userId };
    editQuestion(questionWithUser);
  }

  async function editQuestion(questionWithUser) {
    setLoadingAddQuestion(true);
    const response = await fetch(`/api/question/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionWithUser),
    });

    if (response.ok) {
      setLoadingAddQuestion(false);
      setErrorMessage("");
      setSuccessEdit("Yes! You have edited successfully this question!");
      setfailedSubmission("");
      setTimeout(() => {
        router.push(`/question/${id}`);
      }, 1000);
    }
  }

  if (isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <Header />
      <h2>Edit Question</h2>
      <Link href={`/question/${id}`}>
        <p>back</p>
      </Link>
      <QuestionsForm
        onSubmit={handleSubmit}
        formName={"edit-question"}
        defaultData={question}
        loadingAddQuestion={loadingAddQuestion}
        setLoadingAddQuestion={setLoadingAddQuestion}
        errorMessage={errorMessage}
        failedSubmission={failedSubmission}
        successEdit={successEdit}
      />
      <Navigation />
    </>
  );
}
