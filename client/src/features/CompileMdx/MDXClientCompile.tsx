"use client";
import { useState, useEffect } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
interface CompilePreviewMDXProps {
  content: string; // Expecting the 'content' prop to be a string (MDX content)
}
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
                theme: "dracula", // Example theme, change as needed
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
