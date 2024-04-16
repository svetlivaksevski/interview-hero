"use client";
import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
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

  if (session?.status === "loading") {
    return null;
  }

  if (!session?.user) {
    return <SignInPage pagetext="see your personal page" />;
  }

  const questionsAddedbyYou = data?.filter(
    (info) => info.userId === session.user.userId
  );

  return (
    <>
      <Header />
      <img src={session.user.image} className="profilepicture" alt="Profile" />
      <h1>You signed up as {session.user.name}</h1>
      <p>Questions you added: {questionsAddedbyYou?.length || 0}</p>
      <button onClick={() => signOut()}>Sign Out</button>
      <Navigation />
    </>
  );
}
