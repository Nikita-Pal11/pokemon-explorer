import React from 'react';
import { FiSearch } from 'react-icons/fi';

function SearchBar() {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search Pokemon..."
        className="w-full rounded-xl border border-white/10 bg-slate-900/40 px-4 py-2 pl-10 text-sm text-slate-100 placeholder-slate-400 backdrop-blur-sm outline-none transition-all focus:border-purple-500/50 focus:bg-slate-900/70"
      />
      <FiSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

export default SearchBar;
