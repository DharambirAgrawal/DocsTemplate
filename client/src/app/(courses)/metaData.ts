import { Metadata } from "next";
import { baseMetadata, keywords, OGimages } from "@/lib/metaData";

interface Author {
  firstName: string;
  lastName: string;
  bio?: string;
  image?: string;
}

export interface CourseMetaDataType {
  success: boolean;
  data?: {
    title: string;
    description: string;
    category: string;
    slug: string;
    duration: string;
    level: string;
    authorId: Author;
    updatedAt: string;
    createdAt: string;
    metaData: {
      seoTitle: string;
      seoDescription: string;
      seoKeywords: string[];
    };
    Keywords: string[];
  };
}

export interface LessonMetaDataType {
  success: boolean;
  data?: {
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    metaData: {
      metaKeywords: string[];
      metaTitle: string;
      metaDescription: string;
    };
  };
}

export const courseMetadata: Metadata = {
  ...baseMetadata,
  title: "Courses",
  description:
    "Explore our comprehensive collection of courses to advance your skills and knowledge.",
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
    title: "Online Courses | Pathgurus",
    description: "Advance your career with our expert-led online courses",
    type: "website",
    url: "https://pathgurus.com/courses",
    images: OGimages,
  },
  alternates: {
    canonical: "/courses",
  },
  keywords: keywords.data || [],
};

// Function to generate metadata for a specific course
export const specificCourseMetadata = (
  course: CourseMetaDataType
): Metadata => {
  if (!course.data) return courseMetadata;

  const keywordsArray = course.data.metaData.seoKeywords || [];
  const tagNames = course.data.Keywords || [];

  const author = course.data.authorId;
  const authorName = author
    ? `${author.firstName} ${author.lastName}`
    : "Pathgurus Instructor";
  //   const authorUrl = author ? `/instructor/${encodeURIComponent(author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase())}` : "/instructors";

  return {
    title: course.data.metaData.seoTitle || course.data.title,
    description: course.data.metaData.seoDescription || course.data.description,
    keywords: [...keywordsArray, ...tagNames],
    authors: [
      {
        name: authorName,
        url: "",
      },
    ],
    // openGraph: {
    //   title: course.data.metaData.metaTitle || course.data.title,
    //   description:
    //     course.data.metaData.metaDescription || course.data.description,
    //   url: `${process.env.APP_URL}/course/${course.data.slug}`,
    //   publishedTime: course.data.createdAt,
    //   modifiedTime: course.data.updatedAt,
    //   authors: [authorName],
    //   siteName: "Pathgurus",
    //   type: "article",
    //   images: OGimages,
    //   tags: [...tagNames],
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title: course.data.metaData.metaTitle || course.data.title,
    //   description:
    //     course.data.metaData.metaDescription || course.data.description,
    //   site: "@pathgurus",
    //   creator: "@pathgurus",
    //   images: OGimages,
    // },
    // alternates: {
    //   canonical: `${process.env.APP_URL}/course/${course.data.slug}`,
    // },

    openGraph: {
      title: course.data.metaData.seoTitle || course.data.title,
      description:
        course.data.metaData.seoDescription || course.data.description,
      url: `${process.env.APP_URL}/course/${course.data.slug || ""}`,
      publishedTime: course.data.createdAt,
      modifiedTime: course.data.updatedAt,
      authors: [authorName],
      siteName: "Pathgurus",
      type: "article",
      images: OGimages,
      tags: [...tagNames, course.data.category, course.data.level],
    },
    twitter: {
      card: "summary_large_image",
      title: course.data.metaData.seoTitle || course.data.title,
      description:
        course.data.metaData.seoDescription || course.data.description,
      site: "@pathgurus",
      creator: "@pathgurus",
      images: OGimages,
    },
    alternates: {
      canonical: `${process.env.APP_URL}/course/${course.data.slug || ""}`,
    },
  };
};

// Function to generate metadata for a specific lesson
export const lessonMetadata = (
  course: CourseMetaDataType,
  lesson: LessonMetaDataType
): Metadata => {
  if (!course.data || !lesson.data) return courseMetadata;

  const courseKeywords = course.data.metaData.seoKeywords || [];

  const lessonKeywords = lesson.data.metaData.metaKeywords || [];

  const categoryNames = course.data.category.split(",") || [];
  const tagNames = course.data.Keywords;
  return {
    title: `${lesson.data.metaData.metaTitle || lesson.data.title} | ${
      course.data.title
    }`,
    description:
      lesson.data.metaData.metaDescription ||
      `Learn about ${lesson.data.title} in our ${course.data.title} course. ${course.data.description}`,
    keywords: [
      ...lessonKeywords,
      ...courseKeywords,
      ...categoryNames,
      ...tagNames,
    ],
    authors: [
      {
        name: `${course.data.authorId.firstName} ${course.data.authorId.lastName}`,
        url: `/instructor/${encodeURIComponent(
          course.data.authorId.firstName.toLowerCase() +
            "-" +
            course.data.authorId.lastName.toLowerCase()
        )}`,
      },
    ],
    openGraph: {
      title: lesson.data.metaData.metaTitle || lesson.data.title,
      description:
        lesson.data.metaData.metaDescription ||
        `Learn about ${lesson.data.title} in our ${course.data.title} course. ${course.data.description}`,
      url: `${process.env.APP_URL}/course/${course.data.slug || ""}/${
        lesson.data.slug
      }`,
      publishedTime: lesson.data.createdAt,
      modifiedTime: lesson.data.updatedAt,
      authors: [],
      siteName: "Pathgurus",
      type: "article",
      images: OGimages,
      tags: [
        ...categoryNames,
        ...tagNames,
        course.data.category,
        course.data.level,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: lesson.data.metaData.metaTitle || lesson.data.title,
      description: lesson.data.metaData.metaDescription,
      site: "@pathgurus",
      creator: "@pathgurus",
      images: OGimages,
    },
    alternates: {
      canonical: `${process.env.APP_URL}/course/${course.data.slug || ""}/${
        lesson.data.slug
      }`,
    },
    other: {
      "course:level": course.data.level,
      "course:duration": course.data.duration,
      "course:category": course.data.category,
    },
  };
};
