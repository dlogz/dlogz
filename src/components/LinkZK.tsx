"use client";

import { useAccount, useWriteContract } from "wagmi";

import PromiseButton from "./ui/PromiseButton";
import { useGetUserContract } from "../hooks/useGetUserContract";
import { ZK_FACTORY_ABI } from "@/contracts/zkfactory.abi";

export default function LinkZK() {
  const { address } = useAccount();
  const { data: userContract } = useGetUserContract();
  const { writeContractAsync } = useWriteContract();
  if (!address) return null;

  const linkZK = async () => {
    try {
      const _tx = await writeContractAsync({
        abi: ZK_FACTORY_ABI,
        functionName: "createZKContract",
        address: process.env.NEXT_PUBLIC_ZK_FACTORY! as `0x${string}`,
        args: [userContract!],
      });
      console.log(_tx);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-96 h-full w-full justify-center flex items-center">
      <PromiseButton onClick={linkZK}>Link ZK</PromiseButton>
    </div>
  );

}
