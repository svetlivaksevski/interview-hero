"use client";

import Navigation from "../../components/Navigation";
import Header from "../../components/Header";
import QuestionsForm from "../../components/Questionsform";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession, signOut } from "next-auth/react";
import SignInPage from "@/components/SignInPage";

export default function CreateEntryPage() {
  const router = useRouter();
  const session = useSession();
  const [loadingAddQuestion, setLoadingAddQuestion] = useState(false);

  if (session.status === "loading") {
    return null;
  }

  if (session.status === "unauthenticated") {
    return <SignInPage pagetext={"see your personal page"} />;
  }

  if (session.status === "authenticated") {
    const creator = session.data?.user?.id;
  }
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
