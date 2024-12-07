"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const MDEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

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

export default function Md() {
  const [content, setContent] = useState(
    "# Welcome to your Markdown Blog\n\nStart writing here..."
  );
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);

  // Load posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem("blog-posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const handlePublish = async () => {
    try {
      if (!title.trim()) {
        alert("Please enter a title for your post");
        return;
      }

      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: title.trim(),
        content,
        date: new Date().toISOString(),
      };

      const updatedPosts = [...posts, newPost];
      localStorage.setItem("blog-posts", JSON.stringify(updatedPosts));
      setPosts(updatedPosts);

      // Reset form
      setTitle("");
      setContent("# Welcome to your Markdown Blog\n\nStart writing here...");
      alert("Post published successfully!");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      alert("Error publishing post: " + errorMessage);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <header className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-gray-800 dark:text-white"
          >
            Markdown Blog Editor
          </motion.h1>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePublish}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Publish
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = "/blog")}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              View All Posts
            </motion.button>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-6 h-[calc(100vh-12rem)]"
        >
          <div className="w-full h-full">
            <div data-color-mode="light" className="h-full">
              <MDEditor
                value={content}
                onChange={(val) => setContent(val || "")}
                height="100%"
                previewWidth="100vh"
                enablePreview
              />
            </div>
          </div>
          <div className="flex flex-col w-full h-full overflow-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-4">
              <div data-color-mode="light" className="dark:hidden">
                <MDPreview source={content} />
              </div>
              <div data-color-mode="dark" className="hidden dark:block">
                <MDPreview source={content} />
              </div>
            </div>

            {/* Published Posts Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Published Posts
              </h2>
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="border-b border-gray-200 dark:border-gray-700 pb-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
