"use client";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
interface MdxPreviewProps {
  content: string;
  className?: string;
}

export function MdxPreview({ content, className = "" }: MdxPreviewProps) {
  return (
    <div className={`prose dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mb-3">{children}</h2>
          ),
          p: ({ children }) => <p className="mb-4">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc ml-4 mb-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-4 mb-4">{children}</ol>
          ),
          li: ({ children }) => <li className="mb-1">{children}</li>,
          code: ({ children }) => (
            <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
              {children}
            </pre>
          ),
          img: ({ src, alt }) => (
            <img
              src={src as string}
              alt={alt as string}
              className="w-full h-auto rounded-lg"
            />
          ),
        }}
      >
        {content ? content : "Write something"}
      </ReactMarkdown>
    </div>
  );
}
