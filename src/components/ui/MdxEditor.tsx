"use client";

import { useCallback, useRef } from "react";

interface MdxEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function MdxEditor({ value, onChange, className = "" }: MdxEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    },
    [onChange]
  );

  const insertTemplate = (template: string) => {
    if (!textareaRef.current) return;

    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const text = textareaRef.current.value;
    const before = text.substring(0, start);
    const after = text.substring(end);

    const newValue = `${before}${template}${after}`;
    onChange(newValue);

    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(
        start + template.length,
        start + template.length
      );
    }, 0);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-2 flex gap-2 flex-wrap">
        <button
          onClick={() => insertTemplate("![alt text](image-url)")}
          className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Add Image
        </button>
        <button
          onClick={() =>
            insertTemplate("```html\n<div>Your HTML here</div>\n```")
          }
          className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          HTML Block
        </button>
        <button
          onClick={() =>
            insertTemplate("```javascript\n// Your code here\n```")
          }
          className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Code Block
        </button>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        className="w-full h-full min-h-[500px] p-4 font-mono text-base bg-white dark:bg-gray-800 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 outline-none dark:text-white dark:border-gray-600"
        placeholder="Write your MDX content here..."
      />
    </div>
  );
}
