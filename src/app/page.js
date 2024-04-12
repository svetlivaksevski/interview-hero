import Image from "next/image";
import styles from "./page.module.css";
import Header from "../components/Header";
import Randomquestion from "../components/Randomquestion";
import Navigation from "../components/Navigation";

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
