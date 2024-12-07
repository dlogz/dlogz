import { useGetUserContract, useGetUserVerified } from "@/src/hooks/useGetUserContract";
import AnonVerification from "./AnonVerification";
import Blogs from "./Blogs";
import PromiseButton from "../ui/PromiseButton";
import { useWriteContract } from "wagmi";
import { USER_CONTRACT_ABI } from "@/contracts/usercontract.abi";
import { sepolia } from "viem/chains";
import { sha256 } from "viem";
import { toast } from "sonner";
import { ETH_NULL_MEMORY } from "@/src/wagmi/config";
import CreateUser from "../CreateUser";


export default function UserDashboard() {

    const { data: userContract, isLoading } = useGetUserContract();
    const { data: isVerified } = useGetUserVerified(userContract as `0x${string}`);
    const { writeContractAsync } = useWriteContract();

    const isUserContract = !!userContract && userContract !== ETH_NULL_MEMORY;

    const createBlog = async () => {
        try {
            const testId = (Math.random() * 10000).toString();
            const _tx = await writeContractAsync({
                abi: USER_CONTRACT_ABI,
                functionName: 'addBlog',
                address: userContract as `0x${string}`,
                chain: sepolia,
                args: [
                    testId,
                    sha256(Buffer.from(testId)),
                ],
            })
            console.log(_tx);
        } catch (e) {
            console.log(e);
            toast.error("Failed to create blog");
        }
    }


    if (isLoading) {
        return <div className="flex flex-col self-center justify-self-center">Loading...</div>
    }

    if (!isUserContract) {
        return <CreateUser />
    }


    return (
        <div className="flex flex-col w-full self-center max-w-screen-xl px-10">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold mb-6 flex-1">User Dashboard</h1>
                <div className="flex flex-row gap-3 items-center">
                    <PromiseButton onClick={createBlog}>
                        Create Blog
                    </PromiseButton>
                </div>
            </div>
            {!isVerified && <AnonVerification userContract={userContract as `0x${string}`} />}

            <Blogs userContract={userContract as `0x${string}`} />
        </div >
    );
}
