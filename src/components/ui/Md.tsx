"use client";

import { useState } from "react";
import { MdxEditor } from "./MdxEditor";
import { MdxPreview } from "./MdxPreview";
import PromiseButton from "./PromiseButton";
import { toast } from "sonner";

interface MdProps {
  onPublish: (content: string, title: string, slug: string) => Promise<void>;
  onClose: () => void;
}

export default function Md({ onPublish, onClose }: MdProps) {
  const [content, setContent] = useState(
    "# Welcome to your Blog\n\nStart writing here..."
  );
  const [title, setTitle] = useState("");

  const handlePublish = async () => {
    try {
      if (!title.trim()) {
        toast.error("Please enter a title for your post");
        return;
      }

      const slug = title.toLowerCase().replace(/\s+/g, "-");
      await onPublish(content, title, slug);

      setTitle("");
      setContent("# Welcome to your Blog\n\nStart writing here...");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error("Error publishing post: " + errorMessage);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Create New Blog Post
        </h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          <PromiseButton onClick={handlePublish}>Publish</PromiseButton>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-2 gap-6">
        <div className="w-full h-full">
          <MdxEditor value={content} onChange={setContent} className="h-full" />
        </div>
        <div className="flex flex-col w-full h-full overflow-auto">
          <div className="bg-white h-full dark:bg-gray-800  rounded-lg p-6 shadow-lg ">
            <MdxPreview content={content} className="h-full overflow-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
