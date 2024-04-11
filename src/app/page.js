import Image from "next/image";
import styles from "./page.module.css";
import Header from "../../src/app/components/Header";
import Randomquestion from "../../src/app/components/Randomquestion";
import Navigation from "../../src/app/components/Navigation";

export default function Home() {
  return (
    <main>
      <Header />
      <Randomquestion />
      <div>Add question button</div>
      <div>Recent added</div>
      <Navigation />
    </main>
  );
}
