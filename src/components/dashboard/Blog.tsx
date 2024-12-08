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
      <Card>
        <Skeleton className="w-full h-48" />
        <CardContent className="flex flex-col gap-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="hover:shadow-lg transition-shadow duration-200">
        {blogData?.thumbnail ? (
          <img
            src={blogData.thumbnail}
            alt={blogData.title || "Blog thumbnail"}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-t-lg" />
        )}

        <CardContent className="flex flex-col gap-2 items-start p-4">
          <h2 className="text-xl font-bold line-clamp-2">
            {blogData?.title || "Untitled"}
          </h2>

          {blogData?.timestamp && (
            <time className="text-sm text-gray-500">
              {new Date(blogData.timestamp).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}

          <div className="flex justify-between items-center w-full mt-2">
            <span className="text-sm text-gray-500 truncate max-w-[200px]">
              {userBlog?.blobId.slice(0, 10)}...
            </span>

            <span
              className={`badge ${
                userBlog?.isPublished ? "bg-green-500" : "bg-yellow-500"
              } text-white rounded-lg px-2 py-1 text-sm`}
            >
              {userBlog?.isPublished ? "Published" : "Draft"}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Blog;
