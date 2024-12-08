import { useGetUserContract } from "./useGetUserContract";
import { useWriteContract } from "wagmi";
import { USER_CONTRACT_ABI } from "@/contracts/usercontract.abi";
import { sepolia } from "viem/chains";
import { sha256 } from "viem";
import { toast } from "sonner";

export const useCreateBlog = (onSuccess?: () => void) => {
  const { data: userContract } = useGetUserContract();
  const { writeContractAsync } = useWriteContract();

  const createBlog = async (
    content: string,
    title: string,
    slug: string,
    heading: string,
    thumbnail: string
  ) => {
    try {
      const blogData = {
        title,
        content,
        timestamp: new Date().toISOString(),
        thumbnail,
        heading,
      };
      const stringifyBlogData = JSON.stringify(blogData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PUBLISHER}/v1/store`,
        {
          method: "PUT",
          body: stringifyBlogData,
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );

      const data = await response.json();

      console.log(data, "data");

      const blobId = data.newlyCreated.blobObject.blobId;

      const _tx = await writeContractAsync({
        abi: USER_CONTRACT_ABI,
        functionName: "addBlog",
        address: userContract as `0x${string}`,
        chain: sepolia,
        args: [
          slug,
          blobId,
          sha256(Buffer.from(stringifyBlogData)).replace(/^0x/, ""),
        ],
      });
      console.log(_tx, "_tx");

      toast.success("Blog created successfully!");
      onSuccess?.();
    } catch (e) {
      console.error(e);
      toast.error("Failed to create blog");
      throw e;
    }
  };

  return { createBlog };
};
