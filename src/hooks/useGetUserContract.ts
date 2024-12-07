import { useAccount, useReadContract } from "wagmi";
import { FACTORY_ABI } from "@/contracts/factory.abi";
import { USER_CONTRACT_ABI } from "@/contracts/usercontract.abi";
import { ETH_NULL_MEMORY } from "../wagmi/config";

export const useGetUserContract = () => {
  const { address } = useAccount();
  return useReadContract({
    abi: FACTORY_ABI,
    address: process.env.NEXT_PUBLIC_FACTORY_ADDRESS! as `0x${string}`,
    functionName: "getUserContract",
    args: [address as `0x${string}`],
    query: {
      refetchInterval: ({ state }) => {
        if (state.data !== ETH_NULL_MEMORY) return false;
        return 1000;
      },
    },
  });
};

export const useGetAllUserContract = () => {
  return useReadContract({
    abi: FACTORY_ABI,
    address: process.env.NEXT_PUBLIC_FACTORY_ADDRESS! as `0x${string}`,
    functionName: "getAllUsers",
    args: [],
    query: {
      refetchInterval: 50000,
    },
  });
};

export const useGetUserVerified = (userContract: string) => {
  const { data, isLoading, isError } = useReadContract({
    abi: USER_CONTRACT_ABI,
    address: userContract as `0x${string}`,
    functionName: "isUserVerified",
    args: [],
    query: {
      refetchInterval: ({ state }) => {
        if (state.data) return false;
        return 1000;
      },
      enabled: !!userContract,
    },
  });
  return { data: data, isLoading, isError };
};

export const useGetUserBlogSlugs = (userContract: string) => {
  const { data, isLoading, isError } = useReadContract({
    abi: USER_CONTRACT_ABI,
    address: userContract as `0x${string}`,
    functionName: "getAllBlogSlugs",
    args: [],
    query: {
      refetchInterval: () => {
        return 1000;
      },
      enabled: !!userContract,
    },
  });

  return { data, isLoading, isError };
};

export const useGetUserBlog = (userContract: string, slug: string) => {
  const { data, isLoading, isError } = useReadContract({
    abi: USER_CONTRACT_ABI,
    address: userContract as `0x${string}`,
    functionName: "getBlogBySlug",
    args: [slug],
    query: {
      refetchInterval: ({ state }) => {
        if (state.data) return false;
        return 1000;
      },
      enabled: !!slug && !!userContract,
    },
  });

  return { data, isLoading, isError };
};
