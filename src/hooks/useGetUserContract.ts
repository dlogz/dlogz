import { useAccount, useReadContract } from "wagmi";
import { FACTORY_ABI } from '@/contracts/factory.abi';
import { sepolia } from "wagmi/chains";
import { USER_CONTRACT_ABI } from "@/contracts/usercontract.abi";

export const useGetUserContract = () => {
    const { address } = useAccount();
    return useReadContract({
        abi: FACTORY_ABI,
        address: process.env.NEXT_PUBLIC_FACTORY_ADDRESS! as `0x${string}`,
        chainId: sepolia.id,
        functionName: 'getUserContract',
        args: [address as `0x${string}`],
    })
};


export const useGetUserVerified = (userContract: string) => {
    const { data, isLoading, isError } = useReadContract({
        abi: USER_CONTRACT_ABI,
        address: userContract as `0x${string}`,
        chainId: sepolia.id,
        functionName: 'isUserVerified',
        args: [],
    })

    return { data: data, isLoading, isError };
};
