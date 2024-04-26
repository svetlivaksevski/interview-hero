"use client";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import useSWR from "swr";
import { useState } from "react";
import SignInPage from "@/components/SignInPage";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import {
  LiaListSolid,
  LiaAngleDownSolid,
  LiaGrinHearts,
  LiaMeh,
  LiaSadCry,
} from "react-icons/lia";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Profile() {
  const { data: session } = useSession();
  const [displayCount, setDisplayCount] = useState(5);
  const [badges, setBadges] = useState("");

  const { data, error } = useSWR("/api/question", fetcher);

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch questions:", error);
    }
  }, [error]);

  const questionsAddedbyYou = data?.filter(
    (info) => info.userId === session?.user.userId
  );

  const handleShowMore = () => {
    setDisplayCount(displayCount + 5);
  };

  const displayBadge = () => {
    if (questionsAddedbyYou?.length <= 10) {
      setBadges("Unemployed");
    } else if (questionsAddedbyYou?.length <= 11) {
      setBadges("Possible hire");
    } else if (questionsAddedbyYou?.length >= 12) {
      setBadges("Hiring managers dream");
    }
  };

  useEffect(() => {
    displayBadge();
  }, [questionsAddedbyYou]);

  return (
    <>
      <Header />
      <div className="profile-page">
        {session ? (
          <>
            <img
              src={session.user.image}
              className="profilepicture"
              alt="Profile"
            />
            <h1 className="profile-info">
              You signed up as {session.user.name}
            </h1>

            <button className="button-profile" onClick={() => signOut()}>
              Sign Out
            </button>
            <div className="badge-container">
              {badges === "Unemployed" && (
                <div className="badges">
                  <LiaSadCry fontSize={60} />
                  <p className="badge">Unemployed</p>
                  <p className="badges-level">
                    Stop being a looser! Unlock a new badge by reaching 5
                    questions added.
                  </p>
                  <p className="badges-level-currently">
                    Currently, you&apos;ve added{" "}
                    {questionsAddedbyYou?.length || 0}.
                  </p>
                </div>
              )}
              {badges === "Possible hire" && (
                <div className="badges">
                  <LiaMeh fontSize={60} />
                  <p className="badge">Possible hire</p>
                  <div className="dots-random"></div>
                  <p className="badges-level">
                    You&apos;re on the right track! Reach 11 questions to unlock
                    a new badge.
                  </p>
                  <p className="badges-level-currently">
                    Currently, you&apos;ve added{" "}
                    {questionsAddedbyYou?.length || 0} questions.
                  </p>
                </div>
              )}
              {badges === "Hiring managers dream" && (
                <div className="badges">
                  <LiaGrinHearts fontSize={60} />{" "}
                  <p className="badge">Hiring managers dream</p>
                  <div className="dots-random"></div>
                  <p className="badges-level">
                    What a star! You&apos;ve reached the highest badge. Keep
                    creating new questions!
                  </p>
                  <p className="badges-level-currently">
                    {" "}
                    Currently, you&apos;ve added{" "}
                    {questionsAddedbyYou?.length || 0} questions.
                  </p>
                </div>
              )}
            </div>
            <div className="your-questions-list">
              <div className="questions-added-by-you-text">
                <LiaListSolid />
                Questions added by you:
              </div>
              {questionsAddedbyYou?.slice(0, displayCount).map((q) => (
                <div className="added-by-you" key={q._id}>
                  <a className="added-by-you-link" href={`/question/${q._id}`}>
                    {q.question}
                  </a>
                  <div className="dots"></div>
                </div>
              ))}
              {questionsAddedbyYou?.length > displayCount && (
                <span className="showmore" onClick={handleShowMore}>
                  Show more
                  <LiaAngleDownSolid />
                </span>
              )}
            </div>
          </>
        ) : (
          <SignInPage />
        )}
      </div>
      <Navigation />
    </>
  );
}
