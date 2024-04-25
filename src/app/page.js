import Header from "../components/Header";
import Randomquestion from "../components/Randomquestion";
import Navigation from "../components/Navigation";
import RecentlyAdded from "@/components/RecentlyAdded";

export default function Home() {
  return (
    <main>
      <div className="mainpage">
        <Header />
        <div className="intro-container">
          <div className="styling-text-h1">What is Interview Hero?</div>
          <p className="intro-homepage">
            We&apos;re here to help you find your dream job! Our platform
            provides practical advice and tips for acing your interviews. With
            our guidance, you&apos;ll boost your confidence, perform better in
            interviews, and increase your chances of landing the right job for
            you.
          </p>
        </div>
        <RecentlyAdded />
        <Randomquestion />
        <Navigation />
      </div>
    </main>
  );
}
