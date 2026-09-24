import React from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery?: string;
  children: React.ReactNode;
}

function Pagination({
  currentPage,
  totalPages,
  searchQuery = "",
  children,
}: PaginationProps) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    return `/?${params.toString()}`;
  };

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-2 py-4 sm:px-4">
      <div className="flex-1 min-w-0">{children}</div>

      <div className="flex items-center justify-between gap-4 px-2">
        <div className="shrink-0">
          {hasPrev ? (
            <Link
              href={createPageUrl(currentPage - 1)}
              aria-label="Previous Page"
              className="flex items-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-bold text-white shadow-md sm:shadow-lg shadow-purple-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <FiChevronLeft className="h-5 w-5" /> Previous
            </Link>
          ) : (
            <div className="flex h-11 items-center gap-2 rounded-xl border border-white/5 bg-slate-900/30 px-4 text-xs font-bold text-slate-600 opacity-40 pointer-events-none">
              <FiChevronLeft className="h-5 w-5" /> Previous
            </div>
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-300 backdrop-blur-md">
          Page{" "}
          <span className="font-extrabold text-purple-400">{currentPage}</span>{" "}
          of <span className="font-extrabold text-slate-200">{totalPages}</span>
        </div>

        <div className="shrink-0">
          {hasNext ? (
            <Link
              href={createPageUrl(currentPage + 1)}
              aria-label="Next Page"
              className="flex items-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-bold text-white shadow-md sm:shadow-lg shadow-purple-500/20 transition-all hover:scale-105 active:scale-95"
            >
              Next <FiChevronRight className="h-5 w-5" />
            </Link>
          ) : (
            <div className="flex h-11 items-center gap-2 rounded-xl border border-white/5 bg-slate-900/30 px-4 text-xs font-bold text-slate-600 opacity-40 pointer-events-none">
              Next <FiChevronRight className="h-5 w-5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pagination;
