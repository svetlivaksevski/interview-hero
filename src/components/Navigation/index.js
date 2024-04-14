import Image from "next/image";
import HomeIcon from "@/images/icons/house-solid.svg";
import AddIcon from "@/images/icons/plus-solid.svg";
import ListIcon from "@/images/icons/list-ul-solid.svg";
import UserIcon from "@/images/icons/circle-user-solid.svg";

export default function Navigation() {
  return (
    <ul className="navigation">
      <li className="navbuttons">
        <a href="/">
          <Image src={HomeIcon} width={20} alt="Home page icon" />
          <span> Home</span>
        </a>
      </li>
      <li className="navbuttons">
        <a href="/create">
          <Image src={AddIcon} width={20} alt="Add qustion page icon" />
          <span>Add question</span>
        </a>
      </li>
      <li className="navbuttons">
        <a href="/question">
          <Image src={ListIcon} width={20} alt="All questions page icon" />
          <span> All questions</span>
        </a>
      </li>
      <li className="navbuttons">
        <a href="/profile">
          <Image src={UserIcon} width={20} alt="Profile page icon" />
          <span> Profile</span>
        </a>
      </li>
    </ul>
  );
}
