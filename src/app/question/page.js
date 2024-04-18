"use client";

import useSWR from "swr";
import Navigation from "../../components/Navigation";
import Header from "../../components/Header";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function QuestionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const { data, error, isLoading } = useSWR("/api/question", fetcher);

  const filteredQuestions = data
    ? data.filter((question) => {
        const searchTerms = searchTerm.trim().toLowerCase().split(/\s+/);
        const questionText = (
          question.question +
          " " +
          question.answer
        ).toLowerCase();

        return searchTerms.every((term) => questionText.includes(term));
      })
    : [];

  const filteredCategoryQuestions = selectedCategory
    ? filteredQuestions.filter(
        (question) => question.category === selectedCategory
      )
    : filteredQuestions;

  const handleShowMore = () => {
    setDisplayCount(displayCount + 10);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div name="category">
            <div onClick={() => handleCategorySelect(null)}>All</div>{" "}
            <div
              onClick={() => handleCategorySelect("Behavioral & Cultural Fit")}
            >
              <p>Behavioral & Cultural Fit</p>
            </div>
            <div onClick={() => handleCategorySelect("Technical")}>
              <p>Technical</p>
            </div>
            <div
              onClick={() => handleCategorySelect("Compensation and Benefits")}
            >
              <p>Compensation and Benefits</p>
            </div>
            <div
              onClick={() =>
                handleCategorySelect("Professional Development and Growth")
              }
            >
              <p>Professional Development and Growth</p>
            </div>
            <div onClick={() => handleCategorySelect("Problem-Solving")}>
              <p>Problem-Solving</p>
            </div>
            <div onClick={() => handleCategorySelect("Other")}>Other</div>
          </div>
          <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search questions..."
            />
            <h2>Search Results</h2>
            {filteredCategoryQuestions.length} available results
          </form>
          {error ? (
            <div>Failed to load</div>
          ) : isLoading ? (
            <div>Loading questions...</div>
          ) : (
            <div>
              {filteredCategoryQuestions.length > 0 ? (
                <>
                  {filteredCategoryQuestions.slice(0, displayCount).map((q) => (
                    <div className="container-questions-list" key={q._id}>
                      <h2>Your question:</h2>
                      <p>{q.question}</p>
                      <h3>See the answer:</h3>
                      <a href={`question/${q._id}`}>
                        Click here to see the answer...
                      </a>
                    </div>
                  ))}
                  {filteredCategoryQuestions.length > displayCount && (
                    <span className="showmore" onClick={handleShowMore}>
                      Show more
                    </span>
                  )}
                </>
              ) : (
                <>
                  {(filteredQuestions.length === 0 ? (
                    <h2>No result found for {searchTerm}</h2>
                  ) : null) ??
                    (filteredCategoryQuestions.length === 0 && (
                      <h2> There is no questions added </h2>
                    ))}
                </>
              )}
            </div>
          )}
        </div>
      </main>
      <Navigation />
    </>
  );
}
