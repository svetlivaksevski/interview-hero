"use client";

import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import SignInPage from "@/components/SignInPage";
import { signIn, useSession, signOut } from "next-auth/react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Profile() {
  const session = useSession();

  if (session.status === "loading") {
    return null;
  }

  if (session.status === "unauthenticated") {
    return <SignInPage pagetext={"see your personal page"} />;
  }

  if (session.status === "authenticated") {
    const creator = session.data?.user?.id;

    const { data, error, isLoading } = useSWR("api/question", fetcher);

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading graffiti added by me...</div>;
    const questionsAddedbyYou = data?.filter(
      (info) => info.userId === session.data.user.userId
    );

    return (
      <>
        <Header />
        <img src={session.data.user.image} className="profilepicture" />
        <h1>You sing-up as {session.data.user.name}</h1>

        <p>Questions you added: {questionsAddedbyYou.length}</p>
        <p></p>
        <button onClick={signOut}>Sign Out</button>
        <Navigation />

        {/* 
        </Link>
        <ProfileCard sessionData={session.data} />
        <QuestionsListPersonal creator={creator} /> */}
      </>
    );
  }
}
