"use client";
import useSWR from "swr";

import { LiaDiceSolid } from "react-icons/lia";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Randomquestion() {
  const { data, error, isLoading } = useSWR("/api/question", fetcher);

  if (error) return <div className="center-loading">Failed to load</div>;
  if (isLoading)
    return (
      <div className="center-loading">Loading recently added questions...</div>
    );

  const randomQuestion = data[Math.floor(Math.random() * (data.length - 1))];

  return (
    <div className="randomquestion-container">
      <a href={`question/${randomQuestion._id}`}>
        <div className="randomquestion">
          <div className="dice-text">
            <LiaDiceSolid fontSize={60} />
            <div className="styling-text-h1">Random question</div>
          </div>
          <p>{randomQuestion.question}</p>
          <span className="seetheanswer">Click here to see the answer...</span>

          <div className="dots-random">
            <span className="category-q-random">
              Category:
              <span className="category-q-cont">{randomQuestion.category}</span>
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
