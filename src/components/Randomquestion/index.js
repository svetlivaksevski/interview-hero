"use client";
import useSWR from "swr";

import Image from "next/image";
import RandomIcon from "@/images/icons/dice-solid.svg";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Randomquestion() {
  const { data, error, isLoading } = useSWR("/api/question", fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading recently added questions...</div>;

  const randomQuestion = data[Math.floor(Math.random() * (data.length - 1))];

  return (
    <div className="randomquestion">
      <Image src={RandomIcon} width={50} alt="diceicon" />
      <h2>Random question</h2>
      <p>Question: {randomQuestion.question}</p>
      <a href={`question/${randomQuestion._id}`}>Read more... </a>
    </div>
  );
}
