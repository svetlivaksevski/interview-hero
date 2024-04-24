"use client";

import useSWR from "swr";
import Navigation from "../../components/Navigation";
import Header from "../../components/Header";
import { useState } from "react";
import {
  LiaCodeSolid,
  LiaMoneyBillWaveAltSolid,
  LiaGraduationCapSolid,
  LiaPuzzlePieceSolid,
  LiaClipboardListSolid,
  LiaGlobeEuropeSolid,
  LiaBarsSolid,
} from "react-icons/lia";
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";

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
          <div
            name="category"
            className="
          container-category"
          >
            <div onClick={() => handleCategorySelect(null)}>
              <LiaClipboardListSolid className="icons" fontSize={25} />
              <p className="icons-container"> All</p>
            </div>
            <div
              onClick={() => handleCategorySelect("Behavioral & Cultural Fit")}
            >
              <p className="icons-container">
                <LiaGlobeEuropeSolid className="icons" fontSize={25} />
                Behavioral & Cultural Fit
              </p>
            </div>
            <div onClick={() => handleCategorySelect("Technical")}>
              <p className="icons-container">
                <LiaCodeSolid className="icons" fontSize={25} />
                Technical
              </p>
            </div>
            <div
              onClick={() => handleCategorySelect("Compensation & Benefits")}
            >
              <p className="icons-container">
                <LiaMoneyBillWaveAltSolid className="icons" fontSize={25} />{" "}
                Compensation & Benefits
              </p>
            </div>
            <div
              onClick={() => handleCategorySelect("Professional Development")}
            >
              <p className="icons-container">
                <LiaGraduationCapSolid className="icons" fontSize={25} />
                Professional Development
              </p>
            </div>
            <div onClick={() => handleCategorySelect("Problem-Solving")}>
              <p className="icons-container">
                <LiaPuzzlePieceSolid className="icons" fontSize={25} />
                Problem-Solving
              </p>
            </div>
            <div onClick={() => handleCategorySelect("Other")}>
              <LiaBarsSolid className="icons" fontSize={25} />
              <p className="icons-container">Other</p>
            </div>
          </div>
          <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search questions..."
            />
            <p>
              You are currently at the category:
              {selectedCategory !== null ? selectedCategory : "All questions"}
            </p>
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
                <div className="questions-container">
                  {filteredCategoryQuestions.slice(0, displayCount).map((q) => (
                    <a href={`question/${q._id}`} key={q._id}>
                      <div className="container-questions-list">
                        <h2>Question asked during interview:</h2>
                        <p>{q.question}</p>

                        <span className="seetheanswer">
                          Click here to see the answer...
                        </span>
                        <div className="dots"></div>

                        <span className="category-q">
                          Category:
                          <span className="category-q-cont">{q.category}</span>
                        </span>
                      </div>
                    </a>
                  ))}
                  {filteredCategoryQuestions.length > displayCount && (
                    <span className="showmore" onClick={handleShowMore}>
                      Show more
                    </span>
                  )}
                </div>
              ) : (
                <>
                  {(filteredQuestions.length === 0 ? (
                    <h2>There were no results found for {searchTerm}</h2>
                  ) : null) ??
                    (filteredCategoryQuestions.length === 0 && (
                      <h2>
                        No questions have been added to this category yet.
                      </h2>
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
