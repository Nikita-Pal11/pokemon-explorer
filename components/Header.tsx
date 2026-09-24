"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdCatchingPokemon } from "react-icons/md";
import { FiShuffle, FiHome } from "react-icons/fi";

function Header() {
  const router = useRouter();

  const handleSurpriseMe = () => {
    const randomId = Math.floor(Math.random() * 500) + 1;
    router.push(`/pokemon/${randomId}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-500/15 bg-gradient-to-r from-slate-950/80 via-purple-950/40 to-slate-950/80 backdrop-blur-xl transition-all shadow-lg shadow-purple-950/20">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between gap-1 sm:gap-4 px-2.5 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-1.5 sm:gap-2.5 transition-opacity hover:opacity-90 shrink-0"
        >
          <div className="flex h-7.5 w-7.5 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 group-hover:bg-purple-500/30 transition-colors">
            <MdCatchingPokemon className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-45 transition-transform duration-300" />
          </div>
          <span className="bg-gradient-to-r from-white via-slate-100 to-purple-300 bg-clip-text text-transparent font-extrabold text-sm sm:text-lg tracking-tight">
            Pokemon Center
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>500 Pokemon Registered</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-1 rounded-lg sm:rounded-xl border border-white/10 bg-slate-900/60 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-slate-200 backdrop-blur-sm transition-all hover:border-purple-500/40 hover:bg-slate-800 hover:text-white"
          >
            <FiHome className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <button
            onClick={handleSurpriseMe}
            type="button"
            className="flex items-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-bold text-white shadow-md sm:shadow-lg shadow-purple-500/20 transition-all hover:scale-105 active:scale-95"
            title="Jump to a random Pokémon"
          >
            <FiShuffle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>Surprise Me!</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

