import Image from "next/image";
import styles from "./page.module.css";
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
        <div>Add question button</div>
        <RecentlyAdded />
        <Navigation />
      </div>
    </main>
  );
}
