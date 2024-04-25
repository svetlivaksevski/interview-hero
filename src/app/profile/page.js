"use client";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import useSWR from "swr";
import SignInPage from "@/components/SignInPage";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Profile() {
  const { data: session } = useSession();

  const { data, error } = useSWR("/api/question", fetcher);

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch questions:", error);
    }
  }, [error]);

  const questionsAddedbyYou = data?.filter(
    (info) => info.userId === session?.user.userId
  );

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
            <p className="your-questions">
              Questions you&apos;ve added so far:
            </p>
            <p>{questionsAddedbyYou?.length || 0}</p>
            <button className="button-profile" onClick={() => signOut()}>
              Sign Out
            </button>
            <div className="your-questions-list">
              <div className="questions-added-by-you-text">
                Questions added by you:
              </div>
              {questionsAddedbyYou?.map((q) => (
                <div className="added-by-you" key={q._id}>
                  <a className="added-by-you-link" href={`/question/${q._id}`}>
                    {q.question}
                  </a>
                  <div className="dots"></div>
                </div>
              ))}
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
