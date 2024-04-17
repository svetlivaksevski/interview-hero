"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SignInPage from "@/components/SignInPage";

export default function QuestionsForm({
  defaultData,
  onSubmit,
  successMessage,
  failedSubmission,
  errorMessage,
  successEdit,
}) {
  const session = useSession();

  return (
    <div>
      {session.status === "authenticated" ? (
        <form className="form" aria-labelledby="Form" onSubmit={onSubmit}>
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
              <option value="No category assigned">
                -- Select category --
              </option>
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
              <option value="No category assigned">
                -- Select category --
              </option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <button type="submit">Submit</button>
          {errorMessage && <p>{errorMessage}</p>}
          {successMessage && <p>{successMessage}</p>}
          {successEdit && <p>{successEdit}</p>}
          {failedSubmission && <p>{failedSubmission}</p>}
        </form>
      ) : (
        <SignInPage />
      )}
    </div>
  );
}
