import Image from "next/image";
import logo from '../assets/images/logo.png'

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6 justify-center h-full">
      <Image
        src={logo}
        alt="logo"
        width={300}
        height={300}
        className="w-[200px] h-[100px]"
      />
      <h1 className="font-semibold text-3xl text-center text-[#3797BC]">Welcome to Innovative Integration's Admin Panel!</h1>
    </div>
  );
}
