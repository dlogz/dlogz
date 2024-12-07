import { useGetUserContract, useGetUserVerified } from "@/src/hooks/useGetUserContract";
import { LaunchProveModal } from "@anon-aadhaar/react";
import CreateUser from "../CreateUser";
import { ETH_NULL_MEMORY } from "@/src/wagmi/config";
import AnonVerification from "./AnonVerification";

export default function UserDashboard() {

    const { data: userContract, isLoading } = useGetUserContract();
    const { data: isVerified } = useGetUserVerified(userContract as `0x${string}`);

    if (isLoading) {
        return <div className="flex flex-col self-center justify-self-center">Loading...</div>
    }

    if (userContract === ETH_NULL_MEMORY) {
        return <CreateUser />
    }


    return (
        <div className="flex flex-col w-full self-center max-w-screen-xl px-10">
            <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
            {!isVerified && <AnonVerification userContract={userContract as `0x${string}`} />}
        </div>
    );
}
