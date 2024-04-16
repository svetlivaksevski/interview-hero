"use client";

import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import SignInPage from "@/components/SignInPage";
import { signIn, useSession, signOut } from "next-auth/react";

export default function Profile() {
  const session = useSession();
  console.log(session);
  if (session.status === "loading") {
    return null;
  }

  if (session.status === "unauthenticated") {
    return <SignInPage pagetext={"see your personal page"} />;
  }

  if (session.status === "authenticated") {
    const creator = session.data?.user?.id;

    return (
      <>
        <Header />
        <img src={session.data.user.image} className="profilepicture" />
        <h1>You sing-up as {session.data.user.name}</h1>
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
