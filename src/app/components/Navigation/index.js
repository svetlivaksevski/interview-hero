import Link from "next/link";
import Image from "next/image";
import HomeIcon from "../../../../public/icons/house-solid.svg";
import AddIcon from "../../../../public/icons/plus-solid.svg";
import ListIcon from "../../../../public/icons/list-ul-solid.svg";
import UserIcon from "../../../../public/icons/circle-user-solid.svg";

export default function Navigation() {
  return (
    <ul className="navigation">
      <li>
        <Link href="/">
          <Image src={HomeIcon} width={20} />
        </Link>
      </li>
      <li>
        <Link href="/art-pieces">
          <Image src={AddIcon} width={20} />
        </Link>
      </li>
      <li>
        <Link href="/favorites">
          <Image src={ListIcon} width={20} />
        </Link>
      </li>
      <li>
        <Link href="/favorites">
          {" "}
          <Image src={UserIcon} width={20} />
        </Link>
      </li>
    </ul>
  );
}
