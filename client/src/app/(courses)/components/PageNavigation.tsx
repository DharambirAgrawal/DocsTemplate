// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface navigationType {
//   order: number;
//   title: string;
//   sections: {
//     order: number;
//     slug: string;
//     title: string;
//   }[];
// }

// export function PageNavigation({
//   navigation,
// }: {
//   navigation: navigationType[];
// }) {
//   const pathname = usePathname();
//   const allPages = navigation.flatMap((nav) =>
//     nav.sections.map((section) => ({
//       url: section.slug,
//       title: section.title,
//     }))
//   );
//   console.log(pathname.split("/")[3]);
//   console.log(allPages);
//   const currentPageIndex = allPages.findIndex(
//     (page) => page.url === pathname.split("/")[3]
//   );

//   const prevPage = currentPageIndex > 0 ? allPages[currentPageIndex - 1] : null;
//   console.log(prevPage);
//   const nextPage =
//     currentPageIndex < allPages.length - 1
//       ? allPages[currentPageIndex + 1]
//       : null;
//   console.log(nextPage);

//   return (
//     <div className="flex justify-between mt-12 pt-6 border-t">
//       {prevPage ? (
//         <Link
//           href={prevPage.url}
//           className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
//         >
//           <ChevronLeft className="w-4 h-4 mr-1" />
//           <span>{prevPage.title}</span>
//         </Link>
//       ) : (
//         <div></div>
//       )}
//       {nextPage && (
//         <Link
//           href={nextPage.url}
//           className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
//         >
//           <span>{nextPage.title}</span>
//           <ChevronRight className="w-4 h-4 ml-1" />
//         </Link>
//       )}
//     </div>
//   );
// }
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
    <div className="flex justify-between mt-12 pt-6 border-t md:ml-64 px-7 py-8">
      {/* Prev Page */}
      {
        prevPage ? (
          <Link
            href={prevPage.url}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span>{prevPage.title}</span>
          </Link>
        ) : null
        // <div className="opacity-50 text-gray-400">No previous page</div>
      }

      {/* Next Page */}
      {nextPage ? (
        <Link
          href={nextPage.url}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <span>{nextPage.title}</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      ) : null
      // <div className="opacity-50 text-gray-400">No next page</div>
      }
    </div>
  );
}
