"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <>
      <h1>You need to sign-in to be able to see this page.</h1>
      <button onClick={signIn}>Click here to sign-in</button>
    </>
  );
}
