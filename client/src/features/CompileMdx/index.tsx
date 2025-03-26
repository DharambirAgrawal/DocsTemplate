// import { compileMDX } from 'next-mdx-remote/rsc';
// import Image, { ImageProps } from 'next/image';
// import Link from 'next/link';
// import rehypePrettyCode from 'rehype-pretty-code';

// interface PropsType {
//   source: string;
// }

// const components = {
//   h1: (props: any) => (
//     <h1 {...props} className="text-3xl font-bold my-4 text-center">
//       {props.children}
//     </h1>
//   ),
//   strong: (props: any) => (
//     <strong
//       {...props}
//       className="font-semibold text-accent"
//       id={props.children}
//     >
//       {props.children}
//     </strong>
//   ),
//   a: (props: any) => (
//     <Link
//       href={props.href}
//       title={props.title}
//       className="text-blue-500 hover:underline"
//     >
//       {props.children}
//     </Link>
//   ),
//   img: (props: any) => (
//     <Image
//       sizes="100vw"
//       style={{ width: '100%', height: 'auto' }}
//       {...(props as ImageProps)}
//       alt=""
//       className="rounded-lg shadow-lg my-4"
//     />
//   ),
//   figure: (props: any) => (
//     <figure className="w-full flex justify-center my-4">
//       <code
//         {...props}
//         className="bg-gray-100 text-sm p-4 rounded-md shadow-md overflow-auto"
//       >
//         {props.children}
//       </code>
//     </figure>
//   ),
//   script: () => null,
// };

// export async function CompileMDX(props: PropsType) {
//   const { content } = await compileMDX<{ title: string }>({
//     source: props.source,
//     options: {
//       mdxOptions: {
//         remarkPlugins: [],
//         rehypePlugins: [
//           [
//             rehypePrettyCode,
//             {
//               theme: 'dracula', // Example theme, change as needed
//             },
//           ],
//         ],
//         format: 'mdx',
//       },
//     },
//     // components,
//   });

//   return <>{content}</>;
// }

import { compileMDX } from "next-mdx-remote/rsc";
import { cache } from "react";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import rehypePrettyCode from "rehype-pretty-code";
interface PropsType {
  source: string;
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
    <ul {...props} className="list-disc pl-6 my-4 space-y-2 text-gray-700">
      {props.children}
    </ul>
  ),
  ol: (props: any) => (
    <ol {...props} className="list-decimal pl-6 my-4 space-y-2 text-gray-700">
      {props.children}
    </ol>
  ),
  li: (props: any) => (
    <li {...props} className="pl-2">
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
    return (
      <code
        {...props}
        className="block bg-gray-50 border border-gray-200 rounded-md font-mono text-sm overflow-auto"
      >
        {props.children}
      </code>
    );
  },
  pre: (props: any) => (
    <pre
      {...props}
      className="bg-gray-50 border border-gray-200 rounded-md p-4 my-6 overflow-auto"
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

const compileMDXWithCache = cache(async (source: string) => {
  const { content } = await compileMDX<{ title: string }>({
    source: source,
    options: {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-light", // More readable light theme
              keepBackground: true,
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
    },
    components,
  });
  return content;
});

export async function CompileMDX(props: PropsType) {
  const content = await compileMDXWithCache(props.source);
  return <>{content}</>;
}
