"use client";

import { useState } from "react";
import useSWR from "swr";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function RecentlyAdded() {
  const { data, error, isLoading } = useSWR("/api/question", fetcher);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % limitedData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? limitedData.length - 1 : prevIndex - 1
    );
  };

  if (isLoading || error) return <h2>Loading...</h2>;

  const limitedData = data.slice(0, 5);

  return (
    <main>
      <h1>Recently added</h1>
      <div className="container-questions-list-recently">
        <div className="slideshow">
          <div className="arrows" onClick={handlePrev}>
            <LiaAngleLeftSolid fontSize={70} />
          </div>
          <div>
            <a href={`question/${limitedData[currentIndex]._id}`}>
              <div
                className="container-recently-list"
                key={limitedData[currentIndex]._id}
              >
                <h2>Question asked during interview:</h2>
                <p>{limitedData[currentIndex].question}</p>
                <p className="seetheanswer">Click here to see the answer...</p>
                <div className="dots"></div>
                <span className="category-q">
                  Category:
                  <span className="category-q-cont">
                    {limitedData[currentIndex].category}
                  </span>
                </span>
              </div>
            </a>
          </div>
          <div className="arrows" onClick={handleNext}>
            <LiaAngleRightSolid fontSize={70} />
          </div>
        </div>
      </div>
    </main>
  );
}
