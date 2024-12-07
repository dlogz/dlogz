"use client";
import ConnectWalletPage from "@/src/components/ConnectWallet";
import UserDashboard from "@/src/components/dashboard";
import Nav from "@/src/components/nav";
import Footer from "@/src/components/ui/Footer";
import { useAccount } from "wagmi";

export default function Home() {
  const { address } = useAccount();
  return (
    <div className="flex flex-col">
      <Nav />
      <div className="flex flex-col pt-10">
        {address ? <UserDashboard /> : <ConnectWalletPage />}
      </div>
      <Footer />
    </div>
  );
}
