"use client";
import ConnectWalletPage from "@/src/components/ConnectWallet";
import UserDashboard from "@/src/components/dashboard";

import { useAccount } from "wagmi";

export default function Home() {
  const { address } = useAccount();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col pt-10">
        {address ? <UserDashboard /> : <ConnectWalletPage />}
      </div>
    </div>
  );
}
