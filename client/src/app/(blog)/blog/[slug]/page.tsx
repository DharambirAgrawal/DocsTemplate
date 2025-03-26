import React from "react";
import Image from "next/image";
import { Suspense, cache } from "react";
import { CompileMDX } from "@/features/CompileMdx";
import ReadingProgress from "@/features/ReadingProgress";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import MDXError from "@/features/CompileMdx/MDXError";
import { formatDate } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, XIcon } from "@/utils/icons";
import { blogPostMetadata } from "../../metaData";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getSpecificBlogAction,
  getAllBlogPosts,
} from "../../components/actions";
import dynamic from "next/dynamic";

const NewsLetter = dynamic(() => import("@/app/(blog)/components/NewsLetter"), {
  loading: () => (
    <div className="h-[300px] animate-pulse bg-gray-100 rounded-xl" />
  ),
});

const Topics = dynamic(() => import("../../components/blog/Topics"), {
  loading: () => (
    <div className="h-[200px] animate-pulse bg-gray-100 rounded-xl" />
  ),
});

const RecentPosts = dynamic(() => import("../../components/blog/RecentPosts"), {
  loading: () => (
    <div className="h-[200px] animate-pulse bg-gray-100 rounded-xl" />
  ),
});

interface PostProp {
  success: boolean;
  data?: {
    title: string;
    content: string;
    tags: {
      name: string;
      slug: string;
    }[];
    imageUrl: string;
    publishedAt: string;
    timeRead: string;
    categories: {
      name: string;
      slug: string;
    }[];
    author: {
      image: string;
      firstName: string;
      lastName: string;
    };
  };
}

interface MetaSlugProp {
  success: boolean;
  data?: {
    title: string;
    imageUrl: string;
    publishedAt: string;
    metaData: {
      metaDesc: string;
      metaKeywords: string;
      metaTitle: string;
    };
    summary: string;
    author: {
      image: string;
      firstName: string;
      lastName: string;
    };
    categories: {
      name: string;
      slug: string;
    }[];
    tags: {
      name: string;
      slug: string;
    }[];
  };
}
type Props = {
  params: Promise<{ slug: string }>;
};
interface BlogPostProps {
  success: boolean;
  data: {
    publishedAt: string;
    slug: string;
    updatedAt: string;
    imageUrl: string;
    categories: { slug: string }[];
  }[];
}
export const revalidate = 86400;
export const dynamicParams = true;
export const preferredRegion = "auto"; // Auto-select closest region

export const generateMetadata = cache(
  async ({ params }: Props): Promise<Metadata> => {
    const slug = (await params).slug;
    const post: MetaSlugProp = await getSpecificBlogAction(slug);
    if (!post.success || !post.data) {
      return notFound();
    }

    return blogPostMetadata(post, slug);
  }
);

export async function generateStaticParams() {
  const slugs: BlogPostProps = await getAllBlogPosts();
  if (!slugs.success) {
    return [];
  }

  return slugs.data.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post: PostProp = await getSpecificBlogAction(slug);
  if (!post.success || !post.data) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
        {/* Main Content Column */}
        <div className="lg:col-span-2">
          {/* Featured Image */}
          <div className="rounded-xl overflow-hidden mb-6 sm:mb-8 relative shadow-lg">
            <div className="aspect-[4/5] sm:aspect-[16/9] relative">
              <Image
                src={post.data.imageUrl}
                fill
                alt="Featured"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority
                loading="eager"
                quality={75} // Reduce from default 80
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,...`} // Add a tiny placeholder
              />
              {/* Title Overlay */}
              <div className="absolute inset-0 flex justify-center items-center px-6 sm:px-10 py-4 bg-gradient-to-t from-black via-transparent to-transparent">
                <h2 className="text-white text-3xl sm:text-5xl font-bold text-center drop-shadow-lg select-none">
                  {post.data.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Article Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug tracking-tight">
              {post.data.title}
            </h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              {post.data.author && (
                <div className="flex items-center">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                    <Image
                      src={post.data.author.image}
                      alt={post.data.author.firstName}
                      fill
                      className="rounded-full object-cover border-2 border-gray-100"
                      loading="lazy"
                    />
                  </div>
                  <div className="ml-3">
                    <span className="text-sm sm:text-base text-gray-900 font-medium hover:text-blue-600 transition-colors">
                      {post.data.author.firstName} {post.data.author.lastName}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{formatDate(post.data.publishedAt)}</span>
                <span className="text-gray-300">•</span>
                <span>{post.data.timeRead} min read</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 sm:ml-auto">
                {post.data.categories.map((category, index) => (
                  <span
                    key={index}
                    className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs sm:text-sm font-medium text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}

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
              <CompileMDX source={post.data.content} />
            </ErrorBoundary>
          </article>
          {/* Article Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {post.data.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Share:</span>
                <div className="flex gap-3">
                  <button className="text-gray-600 hover:text-blue-600 transition-colors">
                    <FacebookIcon className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600 hover:text-blue-600 transition-colors">
                    <XIcon className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600 hover:text-blue-600 transition-colors">
                    <InstagramIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-gray-50 p-4 sm:p-6 rounded-xl">
              <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0">
                <Image
                  src={post.data.author.image}
                  alt={post.data.author.firstName}
                  fill
                  className="rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {post.data.author.firstName} {post.data.author.lastName}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {/* {post.data.user.summary} */} bio here
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {/* Recent Posts */}
          <div className="mb-8 sm:mb-12 border border-gray-200 p-10 rounded-xl">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900">
              Recent Posts
            </h2>
            <Suspense
              fallback={
                <div className="animate-pulse bg-gray-100 h-[200px] rounded-xl" />
              }
            >
              <RecentPosts />
            </Suspense>
          </div>

          {/* Explore Topics */}
          <div className="mb-8 sm:mb-12 border border-gray-200 p-10 rounded-xl">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-900">
              Explore Topics
            </h2>
            <Suspense
              fallback={
                <div className="animate-pulse bg-gray-100 h-[200px] rounded-xl" />
              }
            >
              <Topics />
            </Suspense>
          </div>

          {/* Newsletter */}
          <Suspense
            fallback={
              <div className="animate-pulse bg-gray-100 h-[200px] rounded-xl" />
            }
          >
            <NewsLetter />
          </Suspense>
        </aside>
      </div>
      <ReadingProgress />
    </div>
  );
}
