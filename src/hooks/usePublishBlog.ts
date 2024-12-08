import { useGetUserContract } from "./useGetUserContract";
import { useWriteContract } from "wagmi";
import { USER_CONTRACT_ABI } from "@/contracts/usercontract.abi";
import { sepolia } from "viem/chains";
import { toast } from "sonner";

export const usePublishBlog = (onSuccess?: () => void) => {
  const { data: userContract } = useGetUserContract();
  const { writeContractAsync, isPending: isPublishing } = useWriteContract();

  const publishBlog = async (slug: string) => {
    try {
      const _tx = await writeContractAsync({
        abi: USER_CONTRACT_ABI,
        functionName: "publishBlog",
        address: userContract as `0x${string}`,
        chain: sepolia,
        args: [slug],
      });
      console.log(_tx, "_tx");

      toast.success("Blog publishd successfully!");
      onSuccess?.();
    } catch (e) {
      console.error(e);
      toast.error("Failed to publish blog");
      throw e;
    }
  };

  return { publishBlog, isPublishing };
};
