import { FunctionComponent } from "react";
import { Wallet } from "./Wallet";
import Link from "next/link";
import { useAccount } from "wagmi";

export const Header: FunctionComponent = () => {
  const { address } = useAccount();
  return (
    <header className="sticky top-0 z-50 glass-panel">
      <div className="container-width flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-mono font-bold hover:text-primary/90 transition-colors"
          >
            Dlogz
          </Link>
        </div>

        <nav className="flex items-center space-x-8">
          {/* <Link href="/blogs" className="nav-link">
            Blogs
          </Link> */}
          {address && (
            <>
              {" "}
              <Link href="/create" className="nav-link">
                Create
              </Link>
              <Link href="/user" className="nav-link">
                Profile
              </Link>
            </>
          )}
          <Link href="/users" className="nav-link">
            Users
          </Link>
          <div className="ml-4">
            <Wallet />
          </div>
        </nav>
      </div>
    </header>
  );
};
