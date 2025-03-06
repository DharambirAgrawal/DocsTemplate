"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu } from "lucide-react";

interface navigationType {
  order: number;
  title: string;
  sections: {
    order: number;
    slug: string;
    title: string;
  }[];
}

export function AppSidebar({ navigation }: { navigation: navigationType[] }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<
    Array<{ title: string; url: string }>
  >([]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 1) {
      // Search through all sections and add matching sections to results
      const results = navigation.flatMap((item) =>
        item.sections
          .filter((section) =>
            section.title.toLowerCase().includes(term.toLowerCase())
          )
          .map((section) => ({
            title: section.title,
            url: section.slug,
          }))
      );
      setSearchResults(results);
    } else {
      // Clear results if search term is less than 2 characters
      setSearchResults([]);
    }
  };

  // Sort the navigation by order, and sections within each navigation item by order
  const sortedNavigation = navigation
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      ...item,
      sections: item.sections.sort((a, b) => a.order - b.order),
    }));

  return (
    <>
      <div className="w-full fixed z-40 bg-red md:hidden">
        <button
          className="p-2"
          onClick={toggleSidebar}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {" "}
          <Menu className="w-6 h-6" />
        </button>
      </div>
      {/* Mobile Menu Toggle */}

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r dark:bg-gray-800 top-26 md:top-16 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full">
          {/* Search Section */}
          <div className="p-4 border-b dark:border-gray-700">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search the topic..."
                  value={searchTerm}
                  onChange={handleSearch}
                  aria-label="Search documentation"
                  className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </form>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <ul className="mt-2 space-y-1">
                {searchResults.map((result, index) => (
                  <li key={index}>
                    <Link
                      href={result.url}
                      className="block px-2 py-1 text-sm text-blue-600 hover:bg-gray-100 dark:text-blue-400 dark:hover:bg-gray-700 rounded"
                      onClick={() => {
                        setSearchTerm("");
                        setSearchResults([]);
                        setIsOpen(false);
                      }}
                    >
                      {result.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Navigation Section */}
          <nav className="flex-1 overflow-y-auto p-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Navigation
            </h2>
            <ul className="space-y-4">
              {sortedNavigation.map((item, index) => (
                <li key={index}>
                  <div className="mb-2 font-medium text-gray-900 dark:text-gray-100">
                    {item.title}
                  </div>
                  <ul className="space-y-1 pl-4">
                    {item.sections.map((child, childIndex) => (
                      <li key={childIndex}>
                        <Link
                          href={child.slug}
                          className={`block px-2 py-1 rounded-md text-sm ${
                            pathname === child.slug
                              ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                              : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
