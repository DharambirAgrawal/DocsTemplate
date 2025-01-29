import React from 'react';
import Link from 'next/link';
import { getPosts, getCategories } from '@/lib/publicActions';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { categoryMetadata } from '@/lib/metaDatas';
type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  const slug = (await params).category;
  const category = slug.replace(/[\d]/g, '').replace(/-/g, ' ').toUpperCase();
  return {
    ...categoryMetadata,
    title: `${category} Blogs`,
    description: `Explore our ${category} courses. Find the perfect learning path in ${category}.`,
    openGraph: {
      ...categoryMetadata.openGraph,
      title: `${category} Blogs | Pathgurus`,
      url: `https://pathgurus.com/categories/${category}`,
    },
  };
}

interface CategoryPostProps {
  status: 'error' | 'success';
  data: {
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
interface CategoryProps {
  status: 'error' | 'success';
  data: {
    name: string;
    count: number;
    slug: string;
  }[];
}

export const revalidate = 86400;
export const dynamicParams = true;
export async function generateStaticParams() {
  const categories: CategoryProps = await getCategories({});
  if (categories.status === 'error') {
    return [];
  }

  return categories.data.map((slug) => ({
    slug: slug.slug,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const category = (await params).category;
  const categoryPosts: CategoryPostProps = await getPosts({
    limit: 10,
    recent: true,
    category: category,
  });
  if (categoryPosts.status === 'error') {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">
          {categoryPosts.data[0].categories[0].name}
        </h1>
        <p className="text-gray-600">{categoryPosts.data.length} Posts</p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {categoryPosts.data.map((post, index) => (
          <Link
            href={`/blog/${post.slug}`}
            key={index}
            className="group relative flex flex-col rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image Container */}
            <div className="aspect-[4/3] w-full overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                width={400}
                height={300}
              />
              {/* member only badge  */}
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
              <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-200">
                <span className="bg-left-bottom bg-gradient-to-r from-blue-600 to-blue-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500">
                  {post.title}
                </span>
              </h2>

              <p className="text-gray-600 mb-4 flex-1">{post.summary}</p>

              {/* Author Info */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  {post.user && (
                    <Image
                      src={post.user.image}
                      alt={post.user.name}
                      className="w-10 h-10 rounded-full"
                      width={40}
                      height={40}
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
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 group-hover:bg-blue-200 transition-colors duration-200">
                  {post.categories[0].name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}