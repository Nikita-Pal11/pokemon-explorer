import React from "react";
import Link from "next/link";
import { MdCatchingPokemon } from "react-icons/md";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center text-slate-100">
      <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 border border-slate-800 shadow-2xl">
        <MdCatchingPokemon className="h-14 w-14 text-purple-500 animate-spin" style={{ animationDuration: "12s" }} />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">404 - Pokémon Not Found</h1>
      <p className="mt-3 text-sm text-slate-400 max-w-md">
        The wild Pokémon you are looking for has fled or does not exist in our Pokedex registry.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-purple-700 hover:shadow-purple-500/25"
      >
        Return to Pokedex
      </Link>
    </main>
  );
}


