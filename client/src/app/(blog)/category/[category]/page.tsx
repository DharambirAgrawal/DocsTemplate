// app/blog/page.tsx
import React from "react";
import { getPosts } from "../../components/actions";
import BlogGrid from "../../components/blog/BlogGrid";
import BlogHeader from "../../components/blog/BlogHeader";
import Pagination from "../../components/blog/Pagination";
import type { Metadata, ResolvingMetadata } from "next";

import { notFound } from "next/navigation";

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params

//   const slug = (await params).category;
//   const category = slug.replace(/[\d]/g, '').replace(/-/g, ' ').toUpperCase();
//   return {
//     ...categoryMetadata,
//     title: `${category} Blogs`,
//     description: `Explore our ${category} courses. Find the perfect learning path in ${category}.`,
//     openGraph: {
//       ...categoryMetadata.openGraph,
//       title: `${category} Blogs | Pathgurus`,
//       url: `https://pathgurus.com/categories/${category}`,
//     },
//   };
// }

interface PageProps {
  searchParams: {
    page?: string;
  };
  params: Promise<{ category: string }>;
}
export const revalidate = 86400;
export const dynamicParams = true;

// // export const metadata: Metadata = blogMetadata;

export default async function CategoryPage({
  searchParams,
  params,
}: PageProps) {
  const currentPage = Number(await searchParams.page) || 1;
  const category = (await params).category;
  console.log(category);
  const postsPerPage = 6;

  const categoryPosts = await getPosts({
    limit: postsPerPage,
    page: currentPage,
    recent: true,
    category: category,
  });

  console.log(categoryPosts);

  if (!categoryPosts.success) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogHeader totalPosts={categoryPosts.pagination?.total || 0} />
        <BlogGrid posts={categoryPosts.data || []} />
        <Pagination
          currentPage={currentPage}
          totalPages={categoryPosts.pagination?.totalPages || 1}
        />
      </div>
    </main>
  );
}
