"use client";

import { useState } from "react";
import { MdxEditor } from "./MdxEditor";
import { MdxPreview } from "./MdxPreview";
import PromiseButton from "./PromiseButton";
import { toast } from "sonner";

interface MdProps {
  onPublish: (
    content: string,
    title: string,
    slug: string,
    heading: string,
    thumbnailUrl: string
  ) => Promise<void>;
  onClose: () => void;
}

export default function Md({ onPublish, onClose }: MdProps) {
  const [content, setContent] = useState(
    "# Welcome to your Blog\n\nStart writing here..."
  );
  const [title, setTitle] = useState("");
  const [heading, setHeading] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const handlePublish = async () => {
    try {
      if (!title.trim()) {
        toast.error("Please enter a title for your post");
        return;
      }

      if (!heading.trim()) {
        toast.error("Please enter a heading for your post");
        return;
      }

      if (!thumbnailUrl.trim()) {
        toast.error("Please enter a thumbnail URL");
        return;
      }

      try {
        new URL(thumbnailUrl);
      } catch {
        toast.error("Please enter a valid image URL");
        return;
      }

      const slug = title.toLowerCase().replace(/\s+/g, "-");
      await onPublish(content, title, slug, heading, thumbnailUrl);

      setTitle("");
      setHeading("");
      setThumbnailUrl("");
      setContent("# Welcome to your Blog\n\nStart writing here...");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error("Error publishing post: " + errorMessage);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <header className="flex flex-col space-y-4">
        <h1 className="heading-2">Create New Blog Post</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="heading" className="block text-sm font-medium">
              Heading
            </label>
            <input
              id="heading"
              type="text"
              placeholder="Enter post heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="input w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="thumbnailUrl" className="block text-sm font-medium">
            Thumbnail Image URL
          </label>
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <input
                id="thumbnailUrl"
                type="url"
                placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className="input w-full"
              />
            </div>
            {thumbnailUrl && (
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/[0.08]">
                <img
                  src={thumbnailUrl}
                  alt="Thumbnail preview"
                  // fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <PromiseButton onClick={handlePublish} className="btn-primary">
            Publish
          </PromiseButton>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-2 gap-6">
        <div className="w-full h-full">
          <MdxEditor value={content} onChange={setContent} className="h-full" />
        </div>
        <div className="flex flex-col w-full h-full overflow-auto">
          <div className="card h-full">
            <MdxPreview content={content} className="h-full overflow-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
