import { compileMDX } from 'next-mdx-remote/rsc';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import rehypePrettyCode from 'rehype-pretty-code';

interface PropsType {
  source: string;
}

const components = {
  h1: (props: any) => (
    <h1 {...props} className="text-3xl font-bold my-4 text-center">
      {props.children}
    </h1>
  ),
  strong: (props: any) => (
    <strong
      {...props}
      className="font-semibold text-accent"
      id={props.children}
    >
      {props.children}
    </strong>
  ),
  a: (props: any) => (
    <Link
      href={props.href}
      title={props.title}
      className="text-blue-500 hover:underline"
    >
      {props.children}
    </Link>
  ),
  img: (props: any) => (
    <Image
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
      {...(props as ImageProps)}
      alt=""
      className="rounded-lg shadow-lg my-4"
    />
  ),
  figure: (props: any) => (
    <figure className="w-full flex justify-center my-4">
      <code
        {...props}
        className="bg-gray-100 text-sm p-4 rounded-md shadow-md overflow-auto"
      >
        {props.children}
      </code>
    </figure>
  ),
  script: () => null,
};

export async function CompileMDX(props: PropsType) {
  const { content } = await compileMDX<{ title: string }>({
    source: props.source,
    options: {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: 'dracula', // Example theme, change as needed
            },
          ],
        ],
        format: 'mdx',
      },
    },
    // components,
  });

  return <>{content}</>;
}