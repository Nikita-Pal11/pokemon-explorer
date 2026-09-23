import React from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  children: React.ReactNode;
}

function Pagination({
  currentPage,
  totalPages,
  children,
}: PaginationProps) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="relative mx-auto flex max-w-360 items-center justify-between gap-2 px-2 py-6 sm:gap-4 sm:px-4">
      <div className="shrink-0 z-20">
        {hasPrev ? (
          <Link
            href={`/?page=${currentPage - 1}`}
            aria-label="Previous Page"
            className="flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-white/15 bg-slate-900/70 text-slate-200 shadow-xl backdrop-blur-md transition-all hover:scale-110 hover:border-purple-500 hover:bg-purple-600 hover:text-white"
          >
            <FiChevronLeft className="h-6 w-6" />
          </Link>
        ) : (
          <div className="flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-white/5 bg-slate-900/20 text-slate-600 opacity-20 pointer-events-none">
            <FiChevronLeft className="h-6 w-6" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">{children}</div>

      <div className="shrink-0 z-20">
        {hasNext ? (
          <Link
            href={`/?page=${currentPage + 1}`}
            aria-label="Next Page"
            className="flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-white/15 bg-slate-900/70 text-slate-200 shadow-xl backdrop-blur-md transition-all hover:scale-110 hover:border-purple-500 hover:bg-purple-600 hover:text-white"
          >
            <FiChevronRight className="h-6 w-6" />
          </Link>
        ) : (
          <div className="flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-white/5 bg-slate-900/20 text-slate-600 opacity-20 pointer-events-none">
            <FiChevronRight className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Pagination;
