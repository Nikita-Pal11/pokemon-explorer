"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentQuery = searchParams.get("search") || "";
      const trimmed = searchTerm.trim();
      if (trimmed !== currentQuery) {
        const params = new URLSearchParams(searchParams.toString());
        if (trimmed) {
          params.set("search", trimmed);
          params.set("page", "1");
        } else {
          params.delete("search");
        }
        router.push(`/?${params.toString()}`);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, router, searchParams]);

  const handleClear = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="relative mx-auto w-full max-w-md px-4 my-2">
      <input
        type="text"
        placeholder="Search Pokémon by name or ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-900/40 px-4 py-2 pl-10 pr-9 text-sm text-slate-100 placeholder-slate-400 backdrop-blur-sm outline-none transition-all focus:border-purple-500/50 focus:bg-slate-900/70"
      />
      <FiSearch className="absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
          title="Clear search"
          type="button"
        >
          <FiX className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
