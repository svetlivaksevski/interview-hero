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
      {session ? (
        <>
          <img
            src={session.user.image}
            className="profilepicture"
            alt="Profile"
          />
          <h1>You signed up as {session.user.name}</h1>
          <p>Questions you added so far: {questionsAddedbyYou?.length || 0}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <SignInPage />
      )}
      <Navigation />
    </>
  );
}
