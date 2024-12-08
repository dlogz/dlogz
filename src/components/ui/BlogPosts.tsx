"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const MDPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const savedPosts = localStorage.getItem("blog-posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const handleDeletePost = (id: string) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    localStorage.setItem("blog-posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    if (selectedPost?.id === id) {
      setSelectedPost(null);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <header className="mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-gray-800 dark:text-white"
          >
            Published Blog Posts
          </motion.h1>
        </header>

        <div className="grid md:grid-cols-[300px,1fr] gap-6">
          {/* Posts List Sidebar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 h-[calc(100vh-12rem)] overflow-y-auto">
            {posts.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center">
                No posts published yet
              </p>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedPost?.id === post.id
                        ? "bg-blue-50 dark:bg-blue-900"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(post.date).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePost(post.id);
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Post Content Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 h-[calc(100vh-12rem)] overflow-y-auto">
            {selectedPost ? (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                  {selectedPost.title}
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <div data-color-mode="light" className="dark:hidden">
                    <MDPreview source={selectedPost.content} />
                  </div>
                  <div data-color-mode="dark" className="hidden dark:block">
                    <MDPreview source={selectedPost.content} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                Select a post to view its content
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
