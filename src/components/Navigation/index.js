import {
  LiaHomeSolid,
  LiaPlusCircleSolid,
  LiaListSolid,
  LiaUserCircle,
} from "react-icons/lia";

export default function Navigation() {
  return (
    <ul className="navigation">
      <li className="navbuttons">
        <a className="nav-icons-text" href="/">
          <LiaHomeSolid fontSize={25} />
          <span> Home</span>
        </a>
      </li>
      <li className="navbuttons">
        <a className="nav-icons-text" href="/create">
          <LiaPlusCircleSolid fontSize={25} />
          <span>Add question</span>
        </a>
      </li>
      <li className="navbuttons">
        <a className="nav-icons-text" href="/question">
          <LiaListSolid fontSize={25} />
          <span> All questions</span>
        </a>
      </li>
      <li className="navbuttons">
        <a className="nav-icons-text" href="/profile">
          <LiaUserCircle fontSize={25} />

          <span> Profile</span>
        </a>
      </li>
    </ul>
  );
}
