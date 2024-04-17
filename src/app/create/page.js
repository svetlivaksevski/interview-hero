"use client";

import Navigation from "../../components/Navigation";
import Header from "../../components/Header";
import QuestionsForm from "../../components/Questionsform";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateEntryPage() {
  const router = useRouter();
  const [loadingAddQuestion, setLoadingAddQuestion] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [failedSubmission, setfailedSubmission] = useState("");
  const session = useSession();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoadingAddQuestion(true);
    const formData = new FormData(event.target);
    const entryData = Object.fromEntries(formData);

    if (
      entryData.category === "No category assigned" ||
      entryData.difficulty === "No category assigned"
    ) {
      setLoadingAddQuestion(false);
      setErrorMessage("Please select a category.");
      return;
    }
    const questionWithUser = { ...entryData, userId: session.data.user.userId };
    AddQuestion(questionWithUser);
  }

  async function AddQuestion(entryData) {
    const response = await fetch("/api/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entryData),
    });
    if (!response.ok) {
      setfailedSubmission(
        "Ooops, something went wrong. Your question was not added :("
      );
    }
    if (response.ok) {
      setLoadingAddQuestion(false);
      setErrorMessage("");
      setSuccessMessage("Yes! You have added this question successfully!");
      setfailedSubmission("");
      setTimeout(() => {
        router.push("/question");
      }, 1000);
    }
  }
  return (
    <>
      <Header />

      <QuestionsForm
        onSubmit={handleSubmit}
        successMessage={successMessage}
        failedSubmission={failedSubmission}
        errorMessage={errorMessage}
      />
      <Navigation />
    </>
  );
}
