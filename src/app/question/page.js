"use client";

import useSWR from "swr";
import Navigation from "../../components/Navigation";
import Header from "../../components/Header";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function QuestionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [displayCount, setDisplayCount] = useState(10);

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

  const handleShowMore = () => {
    setDisplayCount(displayCount + 10);
  };

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search questions..."
            />
            <h2>Search Results</h2>
            {filteredQuestions.length} available results
          </form>
          {error ? (
            <div>Failed to load</div>
          ) : isLoading ? (
            <div>Loading questions...</div>
          ) : (
            <div>
              {filteredQuestions.length > 0 ? (
                <>
                  {filteredQuestions.slice(0, displayCount).map((q) => (
                    <div className="container-questions-list" key={q._id}>
                      <h2>Your question:</h2>
                      <p>{q.question}</p>
                      <h3>See the answer:</h3>
                      <a href={`question/${q._id}`}>
                        Click here to see the answer...
                      </a>
                    </div>
                  ))}
                  {filteredQuestions.length > displayCount && (
                    <span className="showmore" onClick={handleShowMore}>
                      Show more
                    </span>
                  )}
                </>
              ) : (
                <h2>No results found for &quot;{searchTerm}&quot;</h2>
              )}
            </div>
          )}
        </div>
      </main>
      <Navigation />
    </>
  );
}
