import Logo from "@/images/icons/Logo.png";
import Image from "next/image";
import HomeIcon from "@/images/icons/house-solid.svg";
import AddIcon from "@/images/icons/plus-solid.svg";
import ListIcon from "@/images/icons/list-ul-solid.svg";
import UserIcon from "@/images/icons/circle-user-solid.svg";

export default function Header() {
  return (
    <div className="header">
      <a href="/">
        <Image src={Logo} width={250} alt="Logo" />
      </a>
    </div>
  );
}
