"use client";

import Navigation from "../../components/Navigation";
import Header from "../../components/Header";
import QuestionsForm from "../../components/Questionsform";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateEntryPage() {
  const router = useRouter();
  const [loadingAddQuestion, setLoadingAddQuestion] = useState(false);

  async function AddQuestion(entryData) {
    setLoadingAddQuestion(true);
    const response = await fetch("/api/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entryData),
    });
    if (!response.ok) {
      alert("Ooops, something went wrong. Your question was not added :(");
      console.log(error);
    }
    if (response.ok) {
      setLoadingAddQuestion(false);
      router.push("/question");
      alert("Yes! You have added this question. See the question down below!");
    }
  }

  return (
    <>
      <Header />
      <QuestionsForm
        onSubmit={AddQuestion}
        loadingAddQuestion={loadingAddQuestion}
        setLoadingAddQuestion={setLoadingAddQuestion}
      />
      <Navigation />
    </>
  );
}
