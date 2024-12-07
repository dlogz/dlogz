import {
  useGetUserContract,
  useGetUserVerified,
} from "@/src/hooks/useGetUserContract";
import AnonVerification from "./AnonVerification";
import Blogs from "./Blogs";

import { ETH_NULL_MEMORY } from "@/src/wagmi/config";
import CreateUser from "../CreateUser";
import Link from "next/link";
import { Button } from "../ui/button";
// import Md from "../ui/Md";
// import { useState } from "react";
// import { useCreateBlog } from "@/src/hooks/useCreateBlog";

export default function UserDashboard() {
  const { data: userContract, isLoading } = useGetUserContract();
  const { data: isVerified } = useGetUserVerified(
    userContract as `0x${string}`
  );
  // const [showEditor, setShowEditor] = useState(false);
  // const { createBlog } = useCreateBlog(() => setShowEditor(false));

  const isUserContract = !!userContract && userContract !== ETH_NULL_MEMORY;

  if (isLoading) {
    return (
      <div className="flex flex-col self-center justify-self-center">
        Loading...
      </div>
    );
  }

  if (!isUserContract) {
    return <CreateUser />;
  }

  return (
    <div className="flex flex-col w-full self-center max-w-screen-xl px-10">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold mb-6 flex-1">User Dashboard</h1>
        <div className="flex flex-row gap-3 items-center">
          <Link href="/create">
            <Button>Create Blog</Button>
          </Link>
        </div>
      </div>

      {/* {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 w-full max-w-7xl h-[90vh] rounded-lg p-4">
            <Md onPublish={createBlog} onClose={() => setShowEditor(false)} />
          </div>
        </div>
      )} */}

      {!isVerified && (
        <AnonVerification userContract={userContract as `0x${string}`} />
      )}

      <Blogs userContract={userContract as `0x${string}`} />
    </div>
  );
}
