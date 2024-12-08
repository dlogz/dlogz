import { useGetUserBlog } from "@/src/hooks/useGetUserContract";
import { FC } from "react";
import { Card, CardContent } from "../ui/card";
import { useGetBlog } from "@/src/hooks/useGetBlog";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

interface BlogProps {
  slug: string;
  userContract: `0x${string}`;
}

const Blog: FC<BlogProps> = ({ slug, userContract }) => {
  const { data: userBlog, isLoading } = useGetUserBlog(userContract, slug);
  const { data: blogData } = useGetBlog(userBlog?.blobId || "");

  if (isLoading) {
    return (
      <Card className="h-full">
        <div className="grid grid-cols-[250px,1fr] gap-4 h-full">
          <Skeleton className="h-full min-h-[200px]" />
          <CardContent className="flex flex-col gap-3 py-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="hover:shadow-lg transition-shadow duration-200 h-full">
        <div className="grid grid-cols-[250px,1fr] gap-4 h-full">
          {blogData?.thumbnail ? (
            <img
              src={blogData.thumbnail}
              alt={blogData.title || "Blog thumbnail"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-purple-100 to-green-100" />
          )}

          <CardContent className="flex flex-col justify-between py-4">
            <div className="space-y-3">
              <h2 className="capitalize text-2xl font-bold line-clamp-2 bg-gradient-to-r from-purple-900 to-green-600 bg-clip-text text-transparent">
                {blogData?.title || "Untitled"}
              </h2>

              {blogData?.timestamp && (
                <time className="text-sm text-gray-500 block">
                  {new Date(blogData.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500 truncate max-w-[200px]">
                ID: {userBlog?.blobId.slice(0, 6)}...
              </span>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  userBlog?.isPublished
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {userBlog?.isPublished ? "Published" : "Draft"}
              </span>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default Blog;
