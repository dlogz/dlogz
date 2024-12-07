"use client";

import { useAccount, useWriteContract } from "wagmi";

import { FACTORY_ABI } from '@/contracts/factory.abi';
import PromiseButton from "./ui/PromiseButton";
import { sepolia } from "wagmi/chains";
import { useGetUserContract } from "../hooks/useGetUserContract";
import { ETH_NULL_MEMORY } from "../wagmi/config";


export default function CreateUser() {
    const { address } = useAccount();
    const { data: userContract } = useGetUserContract();
    const { writeContractAsync } = useWriteContract();
    if (!address) return null;

    const createUser = async () => {
        try {
            const _tx = await writeContractAsync({
                abi: FACTORY_ABI,
                functionName: 'createUserContract',
                address: process.env.NEXT_PUBLIC_FACTORY_ADDRESS! as `0x${string}`,
                args: [],
                chain: sepolia
            })
            console.log(_tx);
        } catch (error) {
            console.log(error);
        }
    }

    if (userContract === ETH_NULL_MEMORY) {
        return (
            <PromiseButton onClick={createUser}>Create User</PromiseButton>
        )
    }
    return (
        <div>
            <h1>You are registered</h1>
        </div>
    );
}
