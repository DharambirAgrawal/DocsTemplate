import type { MetadataRoute } from 'next';

// Types for your data
interface BlogPostProps {
  status: 'success' | 'error';
  data: {
    publishedAt: string;
    slug: string;
    updatedAt: string;
    imageUrl: string;
    categories: { slug: string }[];
  }[];
}

interface CategoryProps {
  status: 'success' | 'error';
  data: {
    name: string;
    slug: string;
    updatedAt: string;
  }[];
}

async function getAllBlogPosts() {
  // Replace with your actual data fetching logic
  const posts: BlogPostProps = await fetch(
    `${process.env.MAIN_URL}/api/public/meta/posts`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.BLOG_PUBLIC_KEY || '',
      },
    }
  ).then((res) => res.json());

  return posts.data;
}

async function getAllCategories() {
  // Replace with your actual data fetching logic
  const categories: CategoryProps = await fetch(
    `${process.env.MAIN_URL}/api/public/meta/categories`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.BLOG_PUBLIC_KEY || '',
      },
    }
  ).then((res) => res.json());

  return categories.data;
}

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.APP_URL + '';

  // Fetch your dynamic data
  const blogPosts = await getAllBlogPosts();
  const categories = await getAllCategories();

  // Static pages with their priorities
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/us`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/privacy`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about/terms`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // Generate blog post entries
  const blogEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
    // Optional: Include images if they're important for SEO
    images: [post.imageUrl],
  }));

  // Generate category entries
  const categoryEntries = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Generate archive entries (if you have them)
  //   const archiveEntries = [
  //     {
  //       url: `${baseUrl}/blog/archive`,
  //       lastModified: new Date().toISOString(),
  //       changeFrequency: 'weekly' as const,
  //       priority: 0.6,
  //     },
  //   ];

  // Combine all entries
  return [
    ...staticPages,
    ...blogEntries,
    ...categoryEntries,
    // ...archiveEntries,
  ];
  // .map((entry) => ({
  //   ...entry,
  //   // Ensure lastModified is in ISO format
  //   lastModified: new Date(entry.lastModified).toISOString(),
  // }));
}
