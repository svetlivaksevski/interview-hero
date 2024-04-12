"use client";

import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { signIn, useSession } from "next-auth/react";

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

    return (
      <>
        <Header />

        <Navigation />

        {/* 
        </Link>
        <ProfileCard sessionData={session.data} />
        <QuestionsListPersonal creator={creator} /> */}
      </>
    );
  }
}
