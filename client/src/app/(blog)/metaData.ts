import { Metadata } from "next";
import { baseMetadata, MetaSlugProp, keywords, OGimages } from "@/lib/metaData";

export const categoryMetadata: Metadata = {
  ...baseMetadata,
  title: {
    default: "Blog Categories | Pathgurus",
    template: "%s Blogs | Pathgurus",
  },
  description:
    "Explore diverse blogs on Pathgurus. Discover the latest insights, news, and updates on online learning and teaching.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Course Categories | Pathgurus",
    description:
      "Discover diverse learning opportunities across multiple disciplines",
    type: "website",
    url: "https://pathgurus.com/category",
    images: OGimages,
  },
  alternates: {
    canonical: "/category",
  },
  keywords: keywords.data || [],
};

export const blogMetadata: Metadata = {
  ...baseMetadata,
  title: "Blog | Pathgurus",
  description:
    "Explore our blog for the latest news, updates, and insights on online learning and teaching.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Blog | Pathgurus",
    description:
      "Discover our latest blog posts on online learning and teaching",
    type: "website",
    url: "https://pathgurus.com/blog",
    images: OGimages,
  },
  alternates: {
    canonical: "/blog",
  },
  keywords: keywords.data || [],
};

export const blogPostMetadata = (post: MetaSlugProp, slug: string) => {
  return {
    title: post.data.metaTitle || post.data.title,
    description: post.data.metaDesc || post.data.summary,
    keywords: post.data.metaKeywords?.split(",").map((k) => k.trim()),
    authors: [
      {
        name: post.data.user.name,
        url: `/author/${encodeURIComponent(post.data.user.name)}`,
      },
    ],
    openGraph: {
      title: post.data.metaTitle || post.data.title,
      description: post.data.metaDesc || post.data.summary,
      url: `${process.env.APP_URL}/blog/${slug}`,
      publishedTime: post.data.publishedAt,
      authors: [post.data.user.name],
      siteName: "Pathgurus",

      tags: [
        ...post.data.categories.map((c) => c.name),
        ...post.data.tags.map((t) => t.name),
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.data.metaTitle || post.data.title,
      description: post.data.metaDesc || post.data.summary,
      site: "@pathgurus",

      creator: "@pathgurus",
    },
    alternates: {
      canonical: `${process.env.APP_URL}/blog/${slug}`,
    },
  };
};
