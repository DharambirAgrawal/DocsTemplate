import { Metadata } from "next";
import DefaultLayout from "../../components/DefaultLayout";
import { getCourseAction } from "../../components/actions";
import { CompileMDX } from "@/features/CompileMdx";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import MDXError from "@/features/CompileMdx/MDXError";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { getAllCoursesAction } from "../../components/actions";
import {
  courseMetadata,
  specificCourseMetadata,
  lessonMetadata,
} from "../../metaData";
import type { LessonMetaDataType, CourseMetaDataType } from "../../metaData";

interface ContentType {
  success: boolean;
  data?: {
    content: string;
    title: string;
    slug: string;
    metaData: {
      metaKeywords: string[];
      metaTitle: string;
      metaDescription: string;
    };
  };
}
type Props = {
  params: Promise<{ course: string[] }>;
};

interface SectionType {
  order: number;
  slug: string;
  title: string;
}

interface NavigationItem {
  success: boolean;
  data?: {
    order: number;
    title: string;
    sections: SectionType[];
  }[];
}
interface CourseSlugsType {
  success: boolean;
  data?: {
    slug: string;
    children: string[];
  }[];
}

export const revalidate = 86400;
export const dynamicParams = true;
export const preferredRegion = "auto";
export const generateMetadata = cache(
  async ({ params }: Props): Promise<Metadata> => {
    const slugs = (await params).course;
    if (!slugs || slugs.length === 0) {
      return courseMetadata;
    }
    const courseSlug = slugs[0];
    const lessonSlug = slugs.length > 1 ? slugs[1] : null;
    // Fetch course metadata
    const courseData: CourseMetaDataType = await getCourseAction(
      "metaData",
      courseSlug
    );

    if (!courseData.success || !courseData.data) {
      return notFound();
    }
    // Pre-generate OG image URL for this course
    const ogImageUrl = new URL(`${process.env.CLIENT_BASE_URL}/api/og`);
    ogImageUrl.searchParams.set("title", courseData.data.title);
    ogImageUrl.searchParams.set("type", "course");

    // ogImageUrl.searchParams.set("level", courseData.data.level);
    const courseMetadataWithOg = {
      ...specificCourseMetadata(courseData),
      openGraph: {
        ...specificCourseMetadata(courseData).openGraph,
        images: [
          {
            url: ogImageUrl.toString(),
            width: 1200,
            height: 630,
            alt: courseData.data.title,
          },
        ],
      },
      twitter: {
        ...specificCourseMetadata(courseData).twitter,
        images: [ogImageUrl.toString()],
      },
    };

    // If there's only a course slug, return course metadata
    if (!lessonSlug) {
      return courseMetadataWithOg;
    }

    // If there's a lesson slug, fetch and return lesson metadata
    const lessonData: LessonMetaDataType = await getCourseAction(
      "content",
      courseSlug,
      lessonSlug
    );

    if (!lessonData.success || !lessonData.data) {
      return notFound();
    }
    ogImageUrl.searchParams.set("title", lessonData.data.title);
    ogImageUrl.searchParams.set("subtitle", courseData.data.title);
    ogImageUrl.searchParams.set("type", "lesson");

    const lessonMetadataWithOg = {
      ...lessonMetadata(courseData, lessonData),
      openGraph: {
        ...lessonMetadata(courseData, lessonData).openGraph,
        images: [
          {
            url: ogImageUrl.toString(),
            width: 1200,
            height: 630,
            alt: `${lessonData.data.title} - ${courseData.data.title}`,
          },
        ],
      },
      twitter: {
        ...lessonMetadata(courseData, lessonData).twitter,
        images: [ogImageUrl.toString()],
      },
    };

    return lessonMetadataWithOg;
  }
);

export async function generateStaticParams() {
  const slugs: CourseSlugsType = await getAllCoursesAction("navigation");
  if (!slugs.success || !slugs.data) {
    return [];
  }

  const arr = slugs.data
    .map((post) => {
      const slug = post.slug;
      return post.children.map((child) => [slug, child]);
    })
    .filter((arr) => arr.length > 0)
    .flat();

  return (
    arr.map((slug) => ({
      course: slug,
    })) || []
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ course: string[] }>;
}) {
  const slug = await params;

  const courseSlugs: NavigationItem = await getCourseAction(
    "slug",
    slug.course[0]
  );

  if (!courseSlugs.success || !courseSlugs.data) {
    return notFound();
  }

  const sortedNavigation = courseSlugs.data
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      ...item,
      sections: item.sections.sort((a, b) => a.order - b.order),
    }));

  // Redirect if course only has one section
  if (slug.course.length === 1) {
    return redirect(
      `/courses/${slug.course[0]}/${sortedNavigation[0].sections[0].slug}`
    );
  }

  // If there are not exactly 2 course segments, return a not found response
  if (slug.course.length !== 2) {
    return notFound();
  }
  //TODO: The course should not work separatly
  const content: ContentType = await getCourseAction(
    "content",
    slug.course[0],
    slug.course[1]
  );

  if (!content.success || !content.data) {
    return notFound();
  }

  return (
    <DefaultLayout navigation={sortedNavigation}>
      <main className="mx-auto flex-1 sm:px-8 py-16 md:ml-64 max-sm:w-full transition-all duration-300 ease-in-out flex flex-row px-4 ">
        <article
          className="prose prose-base sm:prose-lg max-w-none flex-1
            prose-headings:tracking-tight prose-headings:font-bold prose-headings:text-gray-900
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:tracking-normal
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:max-w-full prose-img:h-auto
            prose-strong:text-gray-900
            prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
            sm:prose-h1:text-3xl sm:prose-h2:text-2xl sm:prose-h3:text-xl
            md:prose-h1:text-4xl md:prose-h2:text-3xl md:prose-h3:text-2xl
            prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-pre:overflow-x-auto
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500
            prose-blockquote:bg-blue-50 prose-blockquote:px-4 sm:prose-blockquote:px-6 prose-blockquote:py-3 sm:prose-blockquote:py-4
            prose-li:marker:text-gray-400 w-full"
        >
          <ReactErrorBoundary FallbackComponent={MDXError}>
            {content.data && <CompileMDX source={content.data.content} />}
          </ReactErrorBoundary>
        </article>
        {/* <div className="w-70 h-50"></div> */}
      </main>
    </DefaultLayout>
  );
}
