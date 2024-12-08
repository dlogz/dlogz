import { useGetUserContract } from "./useGetUserContract";
import { useWriteContract } from "wagmi";
import { USER_CONTRACT_ABI } from "@/contracts/usercontract.abi";
import { sepolia } from "viem/chains";
import { toast } from "sonner";

export const useUpdateMeta = (onSuccess?: () => void) => {
  const { data: userContract } = useGetUserContract();
  const { writeContractAsync, isPending: isUpdating } = useWriteContract();

  const updateMeta = async (slug: string) => {
    try {
      const _tx = await writeContractAsync({
        abi: USER_CONTRACT_ABI,
        functionName: "updateBlogMeta",
        address: userContract as `0x${string}`,
        chain: sepolia,
        args: [
          slug,
          [],
          1,
          BigInt(1),
          BigInt(1),
        ],
      });
      console.log(_tx, "_tx");

      toast.success("Blog updated successfully!");
      onSuccess?.();
    } catch (e) {
      console.error(e);
      toast.error("Failed to update blog");
      throw e;
    }
  };

  return { updateMeta, isUpdating };
};
