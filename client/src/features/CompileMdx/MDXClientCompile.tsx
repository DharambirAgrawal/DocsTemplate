"use client";
import { useState, useEffect } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import CodeBlock from "./Components/Code";
import Image, { ImageProps } from "next/image";
interface CompilePreviewMDXProps {
  content: string; // Expecting the 'content' prop to be a string (MDX content)
}
const components = {
  h1: (props: any) => (
    <h1
      {...props}
      className="text-3xl sm:text-4xl font-bold my-6 tracking-tight text-gray-900"
      id={props.children?.toString().toLowerCase().replace(/\s+/g, "-")}
    >
      {props.children}
    </h1>
  ),
  h2: (props: any) => (
    <h2
      {...props}
      className="text-2xl sm:text-3xl font-bold mt-8 mb-4 tracking-tight text-gray-900"
      id={props.children?.toString().toLowerCase().replace(/\s+/g, "-")}
    >
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3
      {...props}
      className="text-xl sm:text-2xl font-bold mt-6 mb-3 tracking-tight text-gray-900"
      id={props.children?.toString().toLowerCase().replace(/\s+/g, "-")}
    >
      {props.children}
    </h3>
  ),
  p: (props: any) => (
    <p
      {...props}
      className="my-4 text-gray-700 leading-relaxed tracking-normal"
    >
      {props.children}
    </p>
  ),
  strong: (props: any) => (
    <strong {...props} className="font-semibold text-gray-900">
      {props.children}
    </strong>
  ),
  a: (props: any) => (
    <Link
      href={props.href}
      title={props.title || props.children}
      className="text-blue-600 no-underline hover:underline focus:underline focus:outline-offset-4"
      aria-label={props.title || props.children}
      rel={props.href.startsWith("http") ? "noopener noreferrer" : undefined}
      target={props.href.startsWith("http") ? "_blank" : undefined}
    >
      {props.children}
    </Link>
  ),
  img: (props: any) => (
    <Image
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
      alt={props.alt || ""}
      className="rounded-xl shadow-lg my-6"
      loading="lazy"
    />
  ),
  ul: (props: any) => (
    <ul {...props} className="list-disc my-4 space-y-2 text-gray-700">
      {props.children}
    </ul>
  ),
  ol: (props: any) => (
    <ol {...props} className="list-decimal my-4 space-y-2 text-gray-700">
      {props.children}
    </ol>
  ),
  li: (props: any) => (
    <li {...props} className="">
      {props.children}
    </li>
  ),
  blockquote: (props: any) => (
    <blockquote
      {...props}
      className="border-l-4 border-blue-500 bg-blue-50 px-6 py-4 my-6 text-gray-700 italic"
    >
      {props.children}
    </blockquote>
  ),
  code: (props: any) => {
    // Inline code vs block code detection
    if (typeof props.children === "string") {
      return (
        <code
          {...props}
          className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono text-sm"
        >
          {props.children}
        </code>
      );
    }
    return <CodeBlock className={props.className}>{props.children}</CodeBlock>;
  },
  pre: (props: any) => (
    <pre
      {...props}
      className="bg-gray-50 border border-gray-200 rounded-md p-0 overflow-auto w-full"
    >
      {props.children}
    </pre>
  ),
  hr: () => <hr className="my-8 border-gray-200" />,
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table
        {...props}
        className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-md"
      >
        {props.children}
      </table>
    </div>
  ),
  thead: (props: any) => (
    <thead {...props} className="bg-gray-50">
      {props.children}
    </thead>
  ),
  tbody: (props: any) => (
    <tbody {...props} className="divide-y divide-gray-200">
      {props.children}
    </tbody>
  ),
  tr: (props: any) => (
    <tr {...props} className="hover:bg-gray-50">
      {props.children}
    </tr>
  ),
  th: (props: any) => (
    <th
      {...props}
      className="px-4 py-3 text-left text-sm font-medium text-gray-900"
    >
      {props.children}
    </th>
  ),
  td: (props: any) => (
    <td {...props} className="px-4 py-3 text-sm text-gray-700">
      {props.children}
    </td>
  ),
  figure: (props: any) => (
    <figure className="w-full flex justify-center my-6">
      {props.children}
    </figure>
  ),
  script: () => null,
};
const CompilePreviewMDX: React.FC<CompilePreviewMDXProps> = ({ content }) => {
  const [mdxContent, setMdxContent] = useState<MDXRemoteSerializeResult | null>(
    null
  );

  useEffect(() => {
    const fetchMdxContent = async () => {
      const serializedContent = await serialize(content, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: "github-light", // More readable light theme
                keepBackground: true,
                showCopyButton: true, // Adds a copy button to the top-right of code blocks
                onCopy: (text: string) => {
                  navigator.clipboard.writeText(text).then(() => {
                    console.log("Code copied to clipboard!");
                  });
                },
                onVisitLine(node: any) {
                  // Prevent lines from collapsing in `display: grid` mode
                  if (node.children.length === 0) {
                    node.children = [{ type: "text", value: " " }];
                  }
                },
                onVisitHighlightedLine(node: any) {
                  node.properties.className.push("highlighted");
                },
                onVisitHighlightedWord(node: any) {
                  node.properties.className = ["word"];
                },
              },
            ],
          ],
          format: "mdx",
        },
      });

      // Set the serialized MDX content into state here
      setMdxContent(serializedContent);
    };

    fetchMdxContent();
  }, [content]); // Empty dependency array means this runs only once when the component mounts

  if (!mdxContent) {
    return <div>Loading...</div>;
  }

  return <MDXRemote {...mdxContent} />;
};

export default CompilePreviewMDX;
