"use client";

import { useState } from "react";

export default function CodeBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const codeText = getCodeText(children);
    if (codeText) {
      navigator.clipboard
        .writeText(codeText)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy code: ", err);
        });
    }
  };

  // Function to extract code text from children
  const getCodeText = (children: any): string => {
    if (!children) return "";

    // If children is an object with props.children (likely a React element)
    if (typeof children === "object" && "props" in children && children.props) {
      if (typeof children.props.children === "string") {
        return children.props.children;
      }
      return getCodeText(children.props.children);
    }

    // If children is a string
    if (typeof children === "string") {
      return children;
    }

    // If children is an array
    if (Array.isArray(children)) {
      return children.map((child) => getCodeText(child)).join("");
    }

    return "";
  };

  // Extract language from className (like language-tsx)
  const language = className?.includes("language-")
    ? className.split("language-")[1]?.split(" ")[0] || ""
    : "";

  return (
    <div className="relative group">
      <div className="flex items-center justify-between bg-gray-100 px-4 py-2 text-xs font-sans border-t border-l border-r border-gray-200 rounded-t-md">
        <span className="text-gray-600 uppercase font-bold">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-gray-700 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md transition-colors"
          aria-label={copied ? "Copied!" : "Copy code"}
          title={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div
        className={`bg-gray-50 border border-gray-200 rounded-b-md font-mono text-sm overflow-auto p-4 ${
          className || ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
