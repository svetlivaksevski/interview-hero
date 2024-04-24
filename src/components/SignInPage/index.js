"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="sign-in-page">
      <h1>You need to sign-in with Google to be able to see this page.</h1>
      <button className="sign-in-button" onClick={signIn}>
        Click here to sign-in
      </button>
    </div>
  );
}
