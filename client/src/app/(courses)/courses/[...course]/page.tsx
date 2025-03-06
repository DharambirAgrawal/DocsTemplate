import type { Metadata } from "next";
import { PageNavigation } from "@/app/(courses)/components/PageNavigation";
import DefaultLayout from "../../components/DefaultLayout";
import { getCourseAction } from "../../components/actions";
import { CompileMDX } from "@/features/CompileMdx";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import MDXError from "@/features/CompileMdx/MDXError";
import { notFound } from "next/navigation";

interface ContentType {
  success: boolean;
  data?: {
    content: string;
    title: string;
    slug: string;
    metaData: {
      metaKeywords: string[];
      metaTitle: string;
      metaDescription: string;
    };
  };
}

export const metadata: Metadata = {
  title: "Introduction | Minimal Docs Site",
  description: "Welcome to our minimal documentation site",
};
export const revalidate = 86400;
export const dynamicParams = true;
export const preferredRegion = "auto"; // Auto-select closest region

export default async function Home({
  params,
}: {
  params: Promise<{ course: string[] }>;
}) {
  const slug = await params;
  if (slug.course.length == 1) {
    return notFound();
  }
  if (slug.course.length !== 2) {
    return notFound();
  }

  const content: ContentType = await getCourseAction("content", slug.course[1]);
  if (!content.success && !content.data) {
    return notFound();
  }

  return (
    <DefaultLayout courseSlug={slug.course[0]}>
      <main className="mx-auto flex-1 px-8 py-16 md:ml-64 max-sm:w-full transition-all duration-300 ease-in-out">
        <article
          className="prose prose-base sm:prose-lg max-w-none 
            prose-headings:tracking-tight prose-headings:font-bold prose-headings:text-gray-900 
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:tracking-normal
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline 
            prose-img:rounded-xl prose-strong:text-gray-900
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
            sm:prose-h1:text-4xl sm:prose-h2:text-3xl sm:prose-h3:text-2xl
            prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500
            prose-blockquote:bg-blue-50 prose-blockquote:px-6 prose-blockquote:py-4
            prose-li:marker:text-gray-400"
        >
          <ErrorBoundary errorComponent={MDXError}>
            {content.data && <CompileMDX source={content.data.content} />}
          </ErrorBoundary>
        </article>
      </main>
    </DefaultLayout>
  );
}
