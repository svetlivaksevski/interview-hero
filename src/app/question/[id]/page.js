"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Navigation from "../../../components/Navigation";
import Header from "../../../components/Header";
import Comments from "@/components/Comments";
import CommentForm from "@/components/CommentForm";
import { LiaEdit } from "react-icons/lia";
import { LiaTrashAltSolid } from "react-icons/lia";
import { FaStar } from "react-icons/fa";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function QuestionPage({ params }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = params;
  const { data, error, mutate } = useSWR(`/api/question/${id}`, fetcher);

  if (error) return <div>{`Failed to load :(`}</div>;
  if (!data) return;

  async function deleteQuestion() {
    const response = await fetch(`/api/question/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/question");
    } else {
      console.error(response.status);
    }
  }

  const onlyDate = data.createdAt.substring(0, 10);

  const getCategoryColor = (data) => {
    switch (data.difficulty) {
      case "Easy":
        return "easy";
      case "Medium":
        return "medium";
      case "Hard":
        return "hard";
      default:
        return "white";
    }
  };

  const color = getCategoryColor(data);

  const rating = data.ratedByUserId.map((item) => item.rating);
  const sumOfRatings = rating.reduce((acc, rating) => acc + rating, 0);
  const averageRating = sumOfRatings / rating.length;
  const roundedAverageRating = Math.round(averageRating);

  async function handleRating(e) {
    e.preventDefault();

    const formData = new FormData(document.querySelector("form"));
    const rating = formData.get("rating");

    if (!rating || isNaN(rating)) {
      console.error("Invalid rating value");
      return;
    }

    const response = await fetch(`/api/question/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating }),
    });

    if (response.ok) {
      mutate();
    } else {
      console.error(response.status);
    }
  }

  return (
    <>
      <Header />
      <span onClick={() => window.history.back()}>← Go back</span>
      <div className="container-questions">
        <div className="questions-data">
          <div className="user-info">
            <img src={data.profileImage} className="imagequestion" />
            <div className="user-info-text">
              <div className="buttons-question">
                {session?.user.userId === data?.userId ? (
                  <>
                    <Link href={`/question/${id}/edit`} className="icons">
                      <LiaEdit fontSize={20} />
                    </Link>
                    <button onClick={deleteQuestion} className="icons">
                      <LiaTrashAltSolid fontSize={20} />
                    </button>
                  </>
                ) : (
                  <p></p>
                )}
              </div>
              <p className="text-question">
                {data.userName} is just wondering: How would you handle this
                question?
              </p>
            </div>
          </div>
          <h2>Your question:</h2>
          <p>{data.question}</p>
          <h2>Your answer:</h2>
          <p>{data.answer}</p>
          <div className="dots"></div>
          <div className="category-info">
            <div className="box">
              <p className="created-text">Created:</p>
              <p className="created">{onlyDate}</p>
            </div>
            <div className="box">
              <p className="category-q">Question category:</p>
              <p className="category-q-cont">{data.category}</p>
            </div>
            <div className="box">
              <p className="category-difficulty">
                How difficult was this question?
              </p>
              <p className={color}>{data.difficulty}</p>
            </div>
            <form onSubmit={handleRating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <label key={star}>
                  <input
                    type="radio"
                    name="rating"
                    value={star}
                    onChange={handleRating}
                    defaultChecked={roundedAverageRating === star}
                    style={{ display: "none" }}
                  />
                  <FaStar
                    size={24}
                    color={roundedAverageRating >= star ? "#ffc107" : "#fcfcfc"}
                    fill={roundedAverageRating >= star ? "#ffc107" : "#fcfcfc"}
                    style={{ cursor: "pointer" }}
                  />
                </label>
              ))}
              <button
                id="ratingForm"
                style={{ display: "none" }}
                onClick={handleRating}
              ></button>
            </form>
          </div>
        </div>

        <Comments questionId={id} mutate={mutate} />
        <CommentForm questionId={id} />
      </div>
      <Navigation />
    </>
  );
}
