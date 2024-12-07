import { useGetUserBlogSlugs } from "@/src/hooks/useGetUserContract";
import { FC } from "react";
import Blog from "./Blog";
import { useRouter } from "next/navigation";

interface BlogsProps {
  userContract: `0x${string}`;
}
const Blogs: FC<BlogsProps> = ({ userContract }) => {
  const router = useRouter();
  const { data: blogs, isLoading, isError } = useGetUserBlogSlugs(userContract);

  console.log(blogs, "blogs");

  const handleBlogClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full justify-center items-center p-8">
        <div className="animate-pulse text-lg">Loading blogs...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full w-full justify-center items-center p-8">
        <div className="text-red-500 text-lg">
          Error loading blogs. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 p-4">
      <div className="text-xl font-semibold">Your blogs</div>
      {blogs && blogs.length > 0 ? (
        blogs.map((slug) => (
          <div
            key={slug}
            onClick={() => handleBlogClick(slug)}
            className="transition-all duration-200 hover:transform hover:scale-[1.01] hover:shadow-lg rounded-lg cursor-pointer"
          >
            <Blog slug={slug} userContract={userContract} />
          </div>
        ))
      ) : (
        <div className="flex h-full w-full justify-center items-center p-8 bg-gray-50 rounded-lg">
          <div className="text-lg text-gray-500">
            No blogs found yet. Create your first blog!
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
