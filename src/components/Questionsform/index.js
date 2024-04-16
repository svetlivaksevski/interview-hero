"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession, signOut } from "next-auth/react";

export default function QuestionsForm({
  onSubmit,

  defaultData,
  formName,
  userName,
}) {
  const router = useRouter();
  const session = useSession();
  const [loadingAddQuestion, setLoadingAddQuestion] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoadingAddQuestion(true);
    const formData = new FormData(event.target);
    const entryData = Object.fromEntries(formData);
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
    <div>
      <form className="form" aria-labelledby="Form" onSubmit={handleSubmit}>
        <h1> {defaultData ? "Edit question" : "Add question"}</h1>
        <label htmlFor="question">Question:</label>
        <textarea
          id="question"
          name="question"
          rows="5"
          cols="30"
          defaultValue={defaultData?.question}
        />
        <label htmlFor="answer">Answer:</label>

        <textarea
          id="answer"
          name="answer"
          rows="5"
          cols="30"
          defaultValue={defaultData?.answer}
        />
        {/* <input type="hidden" name="userId" value={userName.user.userId} /> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
