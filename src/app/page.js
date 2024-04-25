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
          We're here to help you find your dream job! Our platform provides
          practical advice and tips for acing your interviews. With our
          guidance, you'll boost your confidence, perform better in interviews,
          and increase your chances of landing the right job for you.{" "}
        </p>
        <RecentlyAdded />
        <Navigation />
      </div>
    </main>
  );
}
