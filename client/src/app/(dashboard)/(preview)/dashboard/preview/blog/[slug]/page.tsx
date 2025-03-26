import React from "react";
import Image from "next/image";
import {
  getPosts,
  getCategories,
} from "@/app/(dashboard)/dashboard/posts/actions";
import { headers } from "next/headers";
import { CompileMDX } from "@/features/CompileMdx";
import ReadingProgress from "@/features/ReadingProgress";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

// import { ErrorBoundary } from "next/dist/client/components/error-boundary
import MDXError from "@/features/CompileMdx/MDXError";
import { formatDate } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, XIcon } from "@/utils/icons";
import NewsLetter from "@/app/(blog)/components/NewsLetter";
interface PostProp {
  status: "error" | "success";
  data: {
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
      bio: string;
    };
  };
}

interface TopicProp {
  success: boolean;
  data: {
    name: string;
    postCount: string;
    slug: string;
  }[];
}
interface RecentPostProp {
  success: boolean;
  data: {
    title: string;
    slug: string;
    imageUrl: string;
    publishedAt: string;
    author: {
      firstName: string;
      lastName: string;
    };
  }[];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post: PostProp = await fetch(
    `${process.env.SERVER_BASE_URL}/api/blog/post/${slug}`,
    {
      method: "GET",
      headers: await headers(),
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch post: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching the post:", error);
      return {
        status: "error",
        content: "There was an error fetching the post.",
      };
    });

  const recentPostsResponse = await getPosts({ recent: true, take: 3 });
  const recentPosts: RecentPostProp = {
    success: recentPostsResponse.success,
    data: recentPostsResponse.data || [],
  };

  const topicsResponse = await getCategories({ recent: true, limit: 3 });
  const topics: TopicProp = {
    success: recentPostsResponse.success,
    data: topicsResponse.data || [],
  };
  //   const topics: TopicProp = await fetch(
  //     `${process.env.MAIN_URL}/api/dashboard/getcategories?num=6`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Cookie: `token=${token}`,
  //       },
  //     }
  //   )
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`Failed to fetch post: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching the post:", error);
  //       return {
  //         status: "error",
  //         content: "There was an error fetching the post!",
  //       };
  //     });
  //   const recentPosts: RecentPostProp = await fetch(
  //     `${process.env.MAIN_URL}/api/dashboard/getrecentposts`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Cookie: `token=${token}`,
  //       },
  //     }
  //   )
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`Failed to fetch post: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching the post:", error);
  //       return {
  //         status: "error",
  //         content: "There was an error fetching the post.",
  //       };
  //     });

  //   if (
  //     post.status === "error" ||
  //     topics.status === "error" ||
  //     recentPosts.status === "error"
  //   ) {
  //     return (
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  //         <div className="bg-red-50 border border-red-200 rounded-lg p-6">
  //           <h1 className="text-3xl font-bold text-red-800 mb-4">Error</h1>
  //           <p className="text-red-700">There was an error fetching the post.</p>
  //           <p className="text-red-600 mt-2">
  //             The post may not have been saved yet.
  //           </p>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 py-10">
        {/* Main Content Column */}
        <div className="lg:col-span-2">
          {/* Featured Image */}
          <div className="rounded-xl overflow-hidden mb-6 sm:mb-8 relative shadow-lg">
            <div className="aspect-[4/5] sm:aspect-[16/9]">
              <Image
                src={post.data.imageUrl}
                fill
                alt="Featured"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 640px) 100vw, 1000px"
                priority
              />
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
                      src={post.data.author.image || ""}
                      alt={post.data.author.firstName}
                      fill
                      className="rounded-full object-cover border-2 border-gray-100"
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
            <ReactErrorBoundary FallbackComponent={MDXError}>
              <CompileMDX source={post.data.content} />
            </ReactErrorBoundary>
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
                  src={post.data.author.image || ""}
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
                  {post.data.author.bio}
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
            <div className="space-y-4 sm:space-y-6">
              {recentPosts.data.map((post, index) => (
                <div
                  key={index}
                  className="flex gap-3 sm:gap-4 group cursor-pointer"
                >
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
                    <Image
                      src={post.imageUrl || "/images/placeholder.png"}
                      alt={post.title}
                      fill
                      className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <div className="text-xs sm:text-sm text-gray-500 space-x-2">
                      {post.author && <span>{post.author.firstName}</span>}
                      <span>•</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Explore Topics */}
          <div className="mb-8 sm:mb-12 border border-gray-200 p-10 rounded-xl">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-900">
              Explore Topics
            </h2>
            <div className="space-y-2">
              {topics.data.map((topic, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 rounded-lg group cursor-pointer transition-colors"
                >
                  <span className="text-sm sm:text-base text-gray-700 capitalize">
                    {topic.name}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 border group-hover:bg-blue-500 border-gray-200 px-2 py-0.5 rounded-full">
                    {topic.postCount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <NewsLetter />
        </aside>
      </div>
      <ReadingProgress />
    </div>
  );
}
