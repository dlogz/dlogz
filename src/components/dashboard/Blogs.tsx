import { useGetUserBlogSlugs } from "@/src/hooks/useGetUserContract";
import { FC } from "react";
import Blog from "./Blog";

interface BlogsProps {
    userContract: `0x${string}`;
}
const Blogs: FC<BlogsProps> = ({ userContract }) => {
    const { data: blogs, isLoading, isError } = useGetUserBlogSlugs(userContract);


    if (isLoading) {
        return <div>Loading blogs...</div>;
    }

    if (isError) {
        return <div>Error loading blogs.</div>;
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            {blogs && blogs.length > 0 ? (
                blogs.map((slug) => (
                    <Blog key={slug} slug={slug} userContract={userContract} />
                ))
            ) : (
                <p>No blogs found.</p>
            )}
        </div>
    );
};

export default Blogs;
