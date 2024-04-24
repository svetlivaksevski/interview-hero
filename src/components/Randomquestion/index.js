"use client";
import useSWR from "swr";

import { LiaDiceSolid } from "react-icons/lia";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Randomquestion() {
  const { data, error, isLoading } = useSWR("/api/question", fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading recently added questions...</div>;

  const randomQuestion = data[Math.floor(Math.random() * (data.length - 1))];

  return (
    <div className="randomquestion">
      <div className="dice-text">
        <LiaDiceSolid fontSize={60} />
        <h2>Random question</h2>
      </div>
      <p>Question: {randomQuestion.question}</p>
      <a href={`question/${randomQuestion._id}`}>Read more... </a>

      <div className="dots-random">
        <span className="category-q-random">
          Category:
          <span className="category-q-cont">{randomQuestion.category}</span>
        </span>
      </div>
    </div>
  );
}
