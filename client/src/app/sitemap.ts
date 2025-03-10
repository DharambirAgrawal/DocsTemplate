import type { MetadataRoute } from "next";

// Types for your data
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

interface CategoryProps {
  success: boolean;
  data: {
    name: string;
    slug: string;
    updatedAt: string;
  }[];
}
interface CourseSlugProps {
  success: boolean;
  data?: {
    slug: string;
    children: string[];
  }[];
}

async function getAllBlogPosts() {
  // Replace with your actual data fetching logic
  const posts: BlogPostProps = await fetch(
    `${process.env.SERVER_BASE_URL}/api/blog/public/allposts`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  return posts.data;
}

async function getAllCategories() {
  // Replace with your actual data fetching logic
  const categories: CategoryProps = await fetch(
    `${process.env.SERVER_BASE_URL}/api/blog/public/categories?limit=0`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  return categories.data;
}

async function getAllCourses() {
  const courses: CourseSlugProps = await fetch(
    `${process.env.SERVER_BASE_URL}/api/course/public/courses/all?type=navigation`,
    {
      method: "GET",
    }
  ).then((res) => res.json());

  if (!courses.success || !courses.data) {
    return [];
  }

  const arr = courses.data
    .map((post) => {
      const slug = post.slug;
      return post.children.map((child) => [slug, child]);
    })
    .filter((arr) => arr.length > 0)
    .flat();

  // arr.map((course: any) => {
  //   let url = `${process.env.SERVER_BASE_URL}/api/course/public/${course[0]}?type=content&contentSlug=${course[1]}`;
  //   const res = fetch(url, {
  //     method: "GET",
  //   }).then((res) => res.json());
  //   if (!res.success) {
  //     return [];
  //   }
  //   return {
  //     url: `${process.env.CLIENT_BASE_URL}/courses/${course[0]}/${course[1]}`,
  //     lastModified: res.data.updatedAt,
  //     changeFrequency: "weekly" as const,
  //     priority: 0.9,
  //   }

  // })
  const courseEntries = await Promise.all(
    arr.map(async (course: any) => {
      let url = `${process.env.SERVER_BASE_URL}/api/course/public/${course[0]}?type=content&contentSlug=${course[1]}`;
      const res = await fetch(url, {
        method: "GET",
      }).then((res) => res.json());

      if (!res.success) {
        return null;
      }

      return {
        url: `${process.env.CLIENT_BASE_URL}/courses/${course[0]}/${course[1]}`,
        lastModified: res.data.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      };
    })
  );
  return courseEntries.filter((entry) => entry !== null);
}

// TODO: Completed edit blog posts and delete blog posts from dashboard
// TODO: check if the path revalidates on posting or editing and all
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.CLIENT_BASE_URL + "";

  // Fetch your dynamic data
  const blogPosts = await getAllBlogPosts();
  const categories = await getAllCategories();
  const courseEntries = await getAllCourses();

  // Static pages with their priorities
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/auth/signin`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/auth/signup`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/auth/forgot-password`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  // Generate blog post entries
  const blogEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: "weekly" as const,
    priority: 0.9,
    // Optional: Include images if they're important for SEO
    images: [post.imageUrl],
  }));

  // Generate category entries
  const categoryEntries = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: "weekly" as const,
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
    ...courseEntries,
    // ...archiveEntries,
  ];
  // .map((entry) => ({
  //   ...entry,
  //   // Ensure lastModified is in ISO format
  //   lastModified: new Date(entry.lastModified).toISOString(),
  // }));
}
