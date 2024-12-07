import { useGetUserBlog } from "@/src/hooks/useGetUserContract";
import { FC } from "react";
import { Card, CardContent } from "../ui/card";

interface BlogProps {
  slug: string;
  userContract: `0x${string}`;
}

const Blog: FC<BlogProps> = ({ slug, userContract }) => {
  const { data: blog, isLoading } = useGetUserBlog(userContract, slug);
  console.log(blog);
  if (isLoading) {
    return <div>Loading blog...</div>;
  }
  return (
    <Card>
      {/* <img src={"/next.svg"} alt={blog?.blobId} className="w-full h-48 object-cover rounded-md" /> */}
      <CardContent className="flex flex-col gap-2 items-start">
        <h2 className="text-lg font-bold mt-2">
          {blog?.blobId.replace(/^0x/, "")}
        </h2>
        <p className="text-sm text-gray-500">{blog?.blobHash}</p>
        <span
          className={`mt-3 badge ${
            blog?.isPublished ? "bg-green-500" : "bg-yellow-500"
          } text-white rounded-lg px-2 py-1`}
        >
          {blog?.isPublished ? "Published" : "Draft"}
        </span>
      </CardContent>
    </Card>
  );
};

export default Blog;
