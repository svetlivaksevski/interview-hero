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
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function QuestionPage({ params }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = params;
  const { data, error, mutate } = useSWR(`/api/question/${id}`, fetcher);

  if (error) return <div>{`Failed to load :(`}</div>;
  if (!data) return;

  async function deleteQuestion() {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (isConfirmed) {
      const response = await fetch(`/api/question/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.push("/question");
      } else {
        console.error(response.status);
      }
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
  const roundedAverageRating = averageRating.toFixed(1);

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
      <div className="container-questions">
        <div className="user-info-text">
          <img src={data.profileImage} className="imagequestion" />
          <span className="text-question">
            Help {data.userName} to answer this question in a better way the
            next time. What will be your answer on it?
          </span>
        </div>
        <div className="questions-data">
          <div className="user-info">
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
          </div>
          <h2>The question: </h2>
          <p>{data.question}</p>
          <h2>The answer:</h2>
          <p>{data.answer}</p>
          <div className="dots"></div>
          <div className="category-info">
            <div className="box">
              <span className="created-text">Created:</span>
              <span className="created">{onlyDate}</span>
            </div>
            <div className="box">
              <span className="category-q">Question category:</span>
              <span className="category-q-cont">{data.category}</span>
            </div>
            <div className="box">
              <span className="category-difficulty">
                How difficult was this question?
              </span>
              <p className={color}>{data.difficulty}</p>
            </div>
            <div className="box">
              {session && (
                <>
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
                        {star <= roundedAverageRating ? (
                          <span
                            role="img"
                            aria-label="Star"
                            className="rating-star"
                          >
                            <FaStar fill="#fbb117" />
                          </span>
                        ) : star - roundedAverageRating === 0.5 ? (
                          <span className="rating-star">
                            <FaStarHalfAlt fill="#fbb117" />
                          </span>
                        ) : (
                          <span
                            role="img"
                            aria-label="Empty Star"
                            className="rating-star"
                          >
                            <FaRegStar />
                          </span>
                        )}
                      </label>
                    ))}
                    <button
                      id="ratingForm"
                      style={{ display: "none" }}
                      onClick={handleRating}
                    ></button>
                  </form>
                  <p>({rating.length === 0 ? 0 : roundedAverageRating})</p>/
                  <p>{rating.length}</p>
                </>
              )}
            </div>
          </div>
        </div>

        <Comments questionId={id} mutate={mutate} />
        <CommentForm questionId={id} />
      </div>
      <Navigation />
    </>
  );
}
