import Image from "next/image";
import styles from "./page.module.css";
import Header from "../../src/app/components/Header";
import Randomquestion from "../../src/app/components/Randomquestion";
import Navigation from "../../src/app/components/Navigation";

export default function Home() {
  return (
    <main>
      <Header />
      <section>
        <p className="intro">
          Prepare better for your next interview. Just in one click!
        </p>
        <p className="introtext">
          Interview hero is a platform where you can add questions you've been
          ask during an interivew and get useful tips from our users. There are
          no more difficult quesitons.
        </p>
      </section>
      <Randomquestion />
      <div>Add question button</div>
      <div>Recent added</div>
      <Navigation />
    </main>
  );
}
