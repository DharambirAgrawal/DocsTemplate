import React from "react";
import Link from "next/link";
import { getPosts } from "../components/actions";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
// import { blogMetadata } from '@/lib/metaDatas';
import type { Metadata } from "next";

// export const metadata: Metadata = blogMetadata;

interface PostProps {
  success: boolean;
  message?: string;
  data?: {
    title: string;
    slug: string;
    imageUrl: string;
    summary: string;
    publishedAt: string;
    user: {
      name: string;
      image: string;
    };
    categories: {
      name: string;
      slug: string;
    }[];
  }[];
}
export default async function BlogPage() {
  const posts: PostProps = await getPosts({ limit: 10, recent: true, page: 1 });
  console.log(posts);
  if (!posts.success) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-red-500">Failed to load posts</div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Posts</h1>
        <p className="text-gray-600">{posts.data?.length} Posts</p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {posts.data?.map((post, index) => (
          <div
            key={index}
            className="group relative flex flex-col rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image Container */}
            <div className="aspect-[4/3] w-full overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={400}
                height={300}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              {/* member only  */}
              {/* {post.memberOnly && (
                <div className="absolute top-4 left-4">
                  <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                    Member Only
                  </span>
                </div>
              )} */}
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <Link
                className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-200"
                href={`/blog/${post.slug}`}
              >
                <span className="bg-left-bottom bg-gradient-to-r from-blue-600 to-blue-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500">
                  {post.title}
                </span>
              </Link>

              <p className="text-gray-600 mb-4 flex-1">{post.summary}</p>

              {/* Author Info */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  {post.user && (
                    <Image
                      src={post.user.image}
                      alt={post.user.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full"
                    />
                  )}

                  <div className="ml-3">
                    {post.user && (
                      <p className="text-sm font-medium text-gray-900">
                        {post.user.name}
                      </p>
                    )}

                    <p className="text-sm text-gray-500">
                      {formatDate(post.publishedAt)}
                    </p>
                  </div>
                </div>

                {/* Category Tag */}
                <Link
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 group-hover:bg-blue-200 transition-colors duration-200"
                  href={`/category/${post.categories[0].slug}`}
                >
                  {post.categories[0].name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
