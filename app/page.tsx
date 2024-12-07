"use client";
import ConnectWalletPage from "@/src/components/ConnectWallet";
import Nav from "@/src/components/nav";
import { LaunchProveModal } from "@anon-aadhaar/react";
import { useAccount } from "wagmi";

export default function Home() {
  const { address } = useAccount();
  return (
    <div className="flex flex-col">
      <Nav />
      <div className="flex flex-col items-center justify-center h-screen">
        {address ? (
          <LaunchProveModal
            nullifierSeed={1234}
            fieldsToReveal={["revealAgeAbove18", "revealPinCode"]}
            buttonTitle="Verify your Age"
          />
        ) : (
          <ConnectWalletPage />
        )}
      </div>
    </div>
  );
}
