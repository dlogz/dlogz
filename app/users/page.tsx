"use client";

import {
  useGetAllUserContract,
  useGetUserVerified,
} from "@/src/hooks/useGetUserContract";
import Link from "next/link";

export default function UsersPage() {
  const { data: users, isLoading } = useGetAllUserContract();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map((userContract: any) => (
          <UserCard key={userContract} userContract={userContract} />
        ))}
      </div>
    </div>
  );
}

function UserCard({ userContract }: { userContract: string }) {
  const { data: isVerified } = useGetUserVerified(userContract);

  return (
    <Link href={`/users/${userContract}`}>
      <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold truncate">{userContract}</h2>
          {isVerified && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Verified
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500">
          {isVerified ? "Verified User" : "Unverified User"}
        </div>
      </div>
    </Link>
  );
}
