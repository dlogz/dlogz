"use client";
import Nav from "@/src/components/nav";
import { LaunchProveModal } from "@anon-aadhaar/react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Nav />
      <LaunchProveModal
        nullifierSeed={1234}
        fieldsToReveal={["revealAgeAbove18", "revealPinCode"]}
        buttonTitle="Verify your Age"
      />
    </div>
  );
}
