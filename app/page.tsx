"use client";
import UserDashboard from "@/src/components/dashboard";
import Landing from "@/src/components/ui/Landing";

import { useAccount } from "wagmi";

export default function Home() {
  const { address } = useAccount();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col pt-10">
        {address && <UserDashboard />}
        {!address && <Landing />}{" "}
      </div>
    </div>
  );
}
