"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MdPreviewProps {
  children: string;
}

export const MdPreview = ({ children }: MdPreviewProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="prose prose-slate dark:prose-invert max-w-none"
    >
      {children}
    </ReactMarkdown>
  );
};
