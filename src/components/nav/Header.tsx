import { FunctionComponent } from "react";
import { Wallet } from "./Wallet";
import Link from "next/link";

export const Header: FunctionComponent = () => {
  return (
    <header className="flex flex-row items-center justify-between px-6 py-3 border-b border-white/10">
      <div className="flex flex-row flex-1">
        <Link href={"/"} className="text-xl font-mono">
          Dlogz
        </Link>
      </div>
      <Link href={"/create"}></Link>
      <Link href={"/blogs"}>Blogs</Link>
      <div className="">
        <Wallet />
      </div>
    </header>
  );
};
