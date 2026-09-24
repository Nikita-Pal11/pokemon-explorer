import React from 'react';
import Link from 'next/link';
import { MdCatchingPokemon } from 'react-icons/md';

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-md bg-blue-400/10 transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-2 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90">
          <MdCatchingPokemon className="h-7 w-7 text-white" />
          <span className="bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Pokemon Center
          </span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
