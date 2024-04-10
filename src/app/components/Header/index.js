import Logo from "../../../../public/icons/Logo.png";
import Image from "next/image";

export default function Header() {
  return (
    <div className="header">
      <Image src={Logo} width={250} alt="Logo" />
    </div>
  );
}
