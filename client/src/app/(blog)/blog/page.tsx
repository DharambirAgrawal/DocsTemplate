// // app/blog/page.tsx
// import React from "react";
// import { getPosts } from "../components/actions";
// import BlogGrid from "../components/blog/BlogGrid";
// import BlogHeader from "../components/blog/BlogHeader";
// import Pagination from "../components/blog/Pagination";
// import type { Metadata } from "next";
// import { blogMetadata } from "../metaData";
// interface PageProps {
//   searchParams: Promise<{
//     page?: string;
//   }>;
// }

// export const metadata: Metadata = blogMetadata;

// export default async function BlogPage({ searchParams }: PageProps) {
//   const searchParamsResolved = await searchParams;
//   const currentPage = Number(searchParamsResolved?.page) || 1;
//   const postsPerPage = 6;

//   const posts = await getPosts({
//     limit: postsPerPage,
//     page: currentPage,
//     recent: true,
//   });

//   if (!posts.success) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center">
//         <div className="text-center space-y-4">
//           <h2 className="text-2xl font-bold text-gray-900">Oops!</h2>
//           <p className="text-gray-600">
//             Failed to load posts. Please try again later.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <BlogHeader totalPosts={posts.pagination?.total || 0} />
//         <BlogGrid posts={posts.data || []} />
//         <Pagination
//           currentPage={currentPage}
//           totalPages={posts.pagination?.totalPages || 1}
//         />
//       </div>
//     </main>
//   );
// }
// app/blog/page.tsx
import React from "react";
import { getPosts } from "../components/actions";
import BlogGrid from "../components/blog/BlogGrid";
import BlogHeader from "../components/blog/BlogHeader";
import Pagination from "../components/blog/Pagination";
import type { Metadata } from "next";
import { blogMetadata } from "../metaData";
interface PageProps {
  params: Promise<{
    page?: string;
  }>;
}
// Fetch metadata statically (this part remains the same)
export const metadata: Metadata = blogMetadata;

// Generate Static Parameters (for pagination)
export async function generateStaticParams() {
  const postsPerPage = 6;
  const posts = await getPosts({
    limit: postsPerPage,
    page: 1,
    recent: true,
  });

  const totalPages = posts.pagination?.totalPages || 1;

  const paths = Array.from({ length: totalPages }).map((_, index) => ({
    page: (index + 1).toString(),
  }));

  return paths;
}

// Main BlogPage component (Static rendering)
export default async function BlogPage({ params }: PageProps) {
  const searchParamsResolved = await params;
  const currentPage = Number(searchParamsResolved.page) || 1;
  const postsPerPage = 6;

  // Fetch the posts for the specific page
  const posts = await getPosts({
    limit: postsPerPage,
    page: currentPage,
    recent: true,
  });

  if (!posts.success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Oops!</h2>
          <p className="text-gray-600">
            Failed to load posts. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogHeader totalPosts={posts.pagination?.total || 0} />
        <BlogGrid posts={posts.data || []} />
        <Pagination
          currentPage={currentPage}
          totalPages={posts.pagination?.totalPages || 1}
        />
      </div>
    </main>
  );
}
