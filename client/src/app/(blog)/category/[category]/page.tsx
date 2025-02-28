// // app/blog/page.tsx
// import React from "react";
// import { getPosts } from "../../components/actions";
// import BlogGrid from "../../components/blog/BlogGrid";
// import BlogHeader from "../../components/blog/BlogHeader";
// import Pagination from "../../components/blog/Pagination";
// import type { Metadata, ResolvingMetadata } from "next";

// import { notFound } from "next/navigation";

// // export async function generateMetadata(
// //   { params }: Props,
// //   parent: ResolvingMetadata
// // ): Promise<Metadata> {
// //   // read route params

// //   const slug = (await params).category;
// //   const category = slug.replace(/[\d]/g, '').replace(/-/g, ' ').toUpperCase();
// //   return {
// //     ...categoryMetadata,
// //     title: `${category} Blogs`,
// //     description: `Explore our ${category} courses. Find the perfect learning path in ${category}.`,
// //     openGraph: {
// //       ...categoryMetadata.openGraph,
// //       title: `${category} Blogs | Pathgurus`,
// //       url: `https://pathgurus.com/categories/${category}`,
// //     },
// //   };
// // }

// interface PageProps {
//   searchParams: Promise<{
//     page?: string;
//   }>;
//   params: Promise<{ category: string }>;
// }

// export const revalidate = 86400;
// export const dynamicParams = true;

// // // export const metadata: Metadata = blogMetadata;

// export default async function CategoryPage({
//   searchParams,
//   params,
// }: PageProps) {
//   const searchParamsResolved = await searchParams;
//   const currentPage = Number(searchParamsResolved.page) || 1;
//   const category = (await params).category;
//   const postsPerPage = 6;

//   const categoryPosts = await getPosts({
//     limit: postsPerPage,
//     page: currentPage,
//     recent: true,
//     category: category,
//   });

//   if (!categoryPosts.success) {
//     return notFound();
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center mb-12 space-y-4">
//           <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
//             {categoryPosts.data[0]?.categories[0]?.name || "Category"}
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Discover {categoryPosts.pagination?.total || 0} stories, thoughts,
//             and insights
//           </p>
//           <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
//         </div>

//         <BlogGrid posts={categoryPosts.data || []} />
//         <Pagination
//           currentPage={currentPage}
//           totalPages={categoryPosts.pagination?.totalPages || 1}
//         />
//       </div>
//     </main>
//   );
// }
// app/blog/[category]/page.tsx
// // app/blog/page.tsx
import React from "react";
import { getPosts } from "../../components/actions";
import BlogGrid from "../../components/blog/BlogGrid";
import Pagination from "../../components/blog/Pagination";
import type { Metadata, ResolvingMetadata } from "next";
import { categoryMetadata } from "../../metaData";
import { notFound } from "next/navigation";
import { getCategories } from "../../components/actions";

interface CategoryProps {
  success: boolean;
  data?: {
    name: string;
    count: number;
    slug: string;
  }[];
}

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  const slug = (await params).category;
  const category = slug.replace(/[\d]/g, "").replace(/-/g, " ").toUpperCase();
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
export async function generateStaticParams() {
  const categories: CategoryProps = await getCategories({ limit: 0 });
  if (!categories.success || !categories.data) {
    return [];
  }
  return categories.data.map((slug) => ({
    slug: slug.slug,
  }));
}
export const revalidate = 86400;
export const dynamicParams = true;
// Static Params Generation (for pagination)
// export async function generateStaticParams() {
//   // Get available categories, ideally from an API or static list
//   const categories = ["technology", "design", "marketing"]; // Example categories, adjust as necessary

//   // Generate static paths for each category and paginated page
//   const paths = [];
//   for (const category of categories) {
//     const postsPerPage = 6;
//     const posts = await getPosts({ limit: postsPerPage, page: 1, category });
//     const totalPages = posts.pagination?.totalPages || 1;

//     // Generate a path for each page in each category
//     for (let i = 1; i <= totalPages; i++) {
//       paths.push({ category, page: i.toString() });
//     }
//   }
//   console.log(paths);

//   return paths;
// }

// Main Component for Category Page
export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const category = (await params).category;
  const postsPerPage = 6;

  // Fetch the posts for the category and page
  const categoryPosts = await getPosts({
    limit: postsPerPage,
    page: currentPage,
    category,
    recent: true,
  });

  if (!categoryPosts.success) {
    return notFound(); // If posts fetching fails, return 404
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            {categoryPosts.data[0]?.categories[0]?.name || "Category"}
          </h1>
          <p className="text-gray-600 text-lg">
            Discover {categoryPosts.pagination?.total || 0} stories, thoughts,
            and insights
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        <BlogGrid posts={categoryPosts.data || []} />
        <Pagination
          currentPage={currentPage}
          totalPages={categoryPosts.pagination?.totalPages || 1}
        />
      </div>
    </main>
  );
}
