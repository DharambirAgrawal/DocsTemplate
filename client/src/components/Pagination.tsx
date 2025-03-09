// app/blog/components/Pagination.tsx
"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    page: number
  ) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    searchParams.set("page", page.toString());
    router.push(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        disabled={currentPage <= 1}
        onClick={(e) => handlePageChange(e, currentPage - 1)}
        className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
          currentPage <= 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
        }`}
      >
        Previous
      </button>

      <div className="flex items-center gap-2">
        {/* Page Number Buttons */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={(e) => handlePageChange(e, page)}
            className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        disabled={currentPage >= totalPages}
        onClick={(e) => handlePageChange(e, currentPage + 1)}
        className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
          currentPage >= totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
}
