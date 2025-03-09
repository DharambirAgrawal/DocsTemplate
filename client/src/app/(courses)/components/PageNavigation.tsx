"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationType {
  order: number;
  title: string;
  sections: {
    order: number;
    slug: string;
    title: string;
  }[];
}

export function PageNavigation({
  navigation,
}: {
  navigation: NavigationType[];
}) {
  const pathname = usePathname();

  // Flatten the sections to get a list of all pages
  const allPages = navigation.flatMap((nav) =>
    nav.sections.map((section) => ({
      url: section.slug,
      title: section.title,
    }))
  );

  // Get the current page index by comparing the slug part of the URL
  const currentPageSlug = pathname.split("/")[3]; // Assume URL structure
  const currentPageIndex = allPages.findIndex(
    (page) => page.url === currentPageSlug
  );

  // Handle previous and next page
  const prevPage = currentPageIndex > 0 ? allPages[currentPageIndex - 1] : null;
  const nextPage =
    currentPageIndex < allPages.length - 1
      ? allPages[currentPageIndex + 1]
      : null;

  return (
    <div className="flex justify-between mt-12 pt-8 border-t border-gray-200 md:ml-64 px-7 py-6">
      <div className="w-1/2 pr-2">
        {prevPage ? (
          <Link
            href={prevPage.url}
            className="group flex flex-col items-start p-3 rounded-lg transition-all hover:bg-gray-50"
          >
            <span className="flex items-center text-sm font-medium text-gray-500 mb-1">
              <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
              Previous
            </span>
            <span className="text-blue-600 font-medium group-hover:text-blue-800">
              {prevPage.title}
            </span>
          </Link>
        ) : (
          <div className="w-full"></div>
        )}
      </div>

      <div className="w-1/2 pl-2">
        {nextPage ? (
          <Link
            href={nextPage.url}
            className="group flex flex-col items-end p-3 rounded-lg transition-all hover:bg-gray-50"
          >
            <span className="flex items-center text-sm font-medium text-gray-500 mb-1">
              Next
              <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-blue-600 font-medium group-hover:text-blue-800">
              {nextPage.title}
            </span>
          </Link>
        ) : (
          <div className="w-full"></div>
        )}
      </div>
    </div>
  );
}
