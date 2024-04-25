"use client";

import { useSession } from "next-auth/react";
import SignInPage from "@/components/SignInPage";
import { useState } from "react";

export default function QuestionsForm({
  defaultData,
  onSubmit,
  successMessage,
  failedSubmission,
  errorMessage,
  successEdit,
}) {
  const session = useSession();
  const [inputError, setInputError] = useState("");
  const [question, setQuestion] = useState(defaultData?.question || "");
  const [answer, setAnswer] = useState(defaultData?.answer || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() === "" || answer.trim() === "") {
      setInputError(
        "You need to fill in both inputs to be able to send the form."
      );
      return;
    }
    onSubmit(e);
  };

  return (
    <div className="form-container">
      {session.status === "authenticated" ? (
        <form className="form" aria-labelledby="Form" onSubmit={handleSubmit}>
          <h1 className="text-form">
            {defaultData ? "Edit question" : "Add question"}
          </h1>
          <label htmlFor="question" className="textarea-text">
            Your question:
          </label>
          <textarea
            id="question"
            name="question"
            placeholder="Share the question you've been asked during your interview here..."
            className="textarea-form"
            rows="5"
            cols="30"
            maxLength={350}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <label htmlFor="answer" className="textarea-text">
            Your answer:
          </label>

          <textarea
            id="answer"
            name="answer"
            placeholder="Share how you answered here..."
            className="textarea-form"
            rows="5"
            cols="30"
            maxLength={500}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <label htmlFor="select">Select question category:</label>
          <div className="custom-select">
            <select
              id="category"
              name="category"
              defaultValue={defaultData?.category}
              className="category-form"
            >
              <option value="No category assigned">
                -- Select category --
              </option>
              <option value="Behavioral & Cultural Fit">
                Behavioral & Cultural Fit
              </option>
              <option value="Technical">Technical</option>
              <option value="Compensation & Benefits">
                Compensation & Benefits
              </option>
              <option value="Professional Development">
                Professional Development
              </option>
              <option value="Problem-Solving">Problem-Solving</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <label htmlFor="select">Select Difficulty Level:</label>
          <div className="custom-select">
            <select
              id="difficulty"
              name="difficulty"
              defaultValue={defaultData?.difficulty}
              className="category-form"
            >
              <option value="No category assigned">
                -- Select category --
              </option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <button className="buttons" type="submit">
            Submit
          </button>
          <div className="form-submission-messages">
            {inputError &&
              !errorMessage &&
              !successMessage &&
              !successEdit &&
              !failedSubmission && (
                <p className="input-error-message">{inputError}</p>
              )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            {successEdit && <p className="success-message">{successEdit}</p>}
            {failedSubmission && (
              <p className="error-message">{failedSubmission}</p>
            )}
          </div>
        </form>
      ) : (
        <SignInPage />
      )}
    </div>
  );
}
