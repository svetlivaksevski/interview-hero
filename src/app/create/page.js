import Navigation from "../../components/Navigation";
import Header from "../../components/Header";
import QuestionsForm from "../../components/Questionsform";
import SignInPage from "@/components/SignInPage";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CreateEntryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <SignInPage />;
  }

  return (
    <>
      <Header />

      <QuestionsForm />
      <Navigation />
    </>
  );
}
