import Header from "../components/Header";
import Randomquestion from "../components/Randomquestion";
import Navigation from "../components/Navigation";
import RecentlyAdded from "@/components/RecentlyAdded";

export default function Home() {
  return (
    <main>
      <div className="mainpage">
        <Header />
        <Randomquestion />
        <h2>What is Interview Hero?</h2>
        <p className="intro-homepage">
          We are an interactive platform on a mission to help people finding
          their dream job. How? By providing tips and tricks how to answer your
          interview questions, which could increase your performance during the
          interview and increase chances to find the right job.
        </p>
        <RecentlyAdded />
        <Navigation />
      </div>
    </main>
  );
}
