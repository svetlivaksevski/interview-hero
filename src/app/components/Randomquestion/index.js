import Image from "next/image";
import RandomIcon from "../../../../public/icons/dice-solid.svg";

export default function Randomquestion() {
  return (
    <div className="randomquestion">
      <Image src={RandomIcon} width={50} alt="diceicon" />
      <h2>Random question</h2>
      <p>Here is your container with questions</p>
    </div>
  );
}
