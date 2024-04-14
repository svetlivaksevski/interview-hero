import { useSession, signIn, signOut } from "next-auth/react";
import Header from "../Header";
import Navigation from "../Navigation";

export default function SignInPage() {
  return (
    <>
      <Header />
      <h1>You need to sign-in to be able to see this page.</h1>
      <button onClick={signIn}>Click here to sign-in</button>
      <Navigation />
    </>
  );
}
