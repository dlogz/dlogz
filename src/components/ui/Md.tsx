"use client";

import { useState } from "react";
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

export default function Md() {
  const [content, setContent] = useState(
    "# Welcome to your Markdown Blog\n\nStart writing here..."
  );
  const [title, setTitle] = useState("");

  const handlePublish = async () => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, title }),
      });

      if (response.ok) {
        alert("Post published successfully!");
      } else {
        throw new Error("Failed to publish post");
      }
    } catch (error) {
      alert("Error publishing post: " + error.message);
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
                enablePreview
              />
            </div>
          </div>
          <div className="w-full h-full overflow-auto bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div data-color-mode="light" className="dark:hidden">
              <MDPreview />
            </div>
            <div data-color-mode="dark" className="hidden dark:block">
              <MDPreview />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
