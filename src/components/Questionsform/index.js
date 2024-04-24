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
  const [formData, setFormData] = useState({
    question: defaultData?.question || "",
    answer: defaultData?.answer || "",
    category: defaultData?.category || "",
    difficulty: defaultData?.difficulty || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trim(),
    });
  };

  return (
    <div className="form-container">
      {session.status === "authenticated" ? (
        <form className="form" aria-labelledby="Form" onSubmit={onSubmit}>
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
            defaultValue={defaultData?.question}
            onChange={handleInputChange}
            value={formData.question}
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
            defaultValue={defaultData?.answer}
            onChange={handleInputChange}
            value={formData.answer}
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
