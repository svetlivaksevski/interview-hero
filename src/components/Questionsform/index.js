"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function QuestionsForm({ defaultData, onSubmit }) {
  const router = useRouter();
  const session = useSession();
  const [loadingAddQuestion, setLoadingAddQuestion] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [failedSubmission, setfailedSubmission] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoadingAddQuestion(true);
    const formData = new FormData(event.target);
    const entryData = Object.fromEntries(formData);

    if (entryData.select === "No category assigned") {
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
      setSuccessMessage(
        "Yes! You have added this question. See the question down below!"
      );
      setfailedSubmission("");
      setTimeout(() => {
        router.push("/question");
      }, 1000);
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
        <label htmlFor="select">Select question category:</label>
        <div className="custom-select">
          <select id="category" name="category">
            <option value="No category assigned">-- Select category --</option>
            <option value="Behavioral & Cultural Fit">
              Behavioral & Cultural Fit
            </option>
            <option value="Technical">Technical</option>
            <option value="Compensation and Benefits">
              Compensation and Benefits
            </option>
            <option value="Professional Development and Growth">
              Professional Development and Growth
            </option>
            <option value="Problem-Solving">Problem-Solving</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <label htmlFor="select">Select Difficulty Level:</label>
        <div className="custom-select">
          <select id="difficulty" name="difficulty">
            <option value="No category assigned">-- Select category --</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <button type="submit">Submit</button>
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
        {failedSubmission && <p>{failedSubmission}</p>}
      </form>
    </div>
  );
}
