import React from "react";

export default function Loading() {
  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] flex-col py-8 px-4">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center mb-8">
        <div className="h-8 w-64 animate-pulse rounded-xl bg-slate-800/80 mb-3" />
        <div className="h-4 w-80 animate-pulse rounded-lg bg-slate-800/50 mb-6" />
        <div className="h-11 w-full max-w-md animate-pulse rounded-xl bg-slate-800/60" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-7xl mx-auto w-full">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="h-4 w-10 animate-pulse rounded bg-slate-800" />
              <div className="h-5 w-16 animate-pulse rounded-full bg-slate-800" />
            </div>
            <div className="flex h-36 w-full items-center justify-center my-2">
              <div className="h-28 w-28 animate-pulse rounded-full bg-slate-800/80" />
            </div>
            <div className="h-5 w-24 mx-auto animate-pulse rounded bg-slate-800 my-2" />
            <div className="mt-4 grid grid-cols-3 gap-1.5 rounded-xl bg-slate-800/40 p-2 h-10 animate-pulse" />
          </div>
        ))}
      </div>
    </main>
  );
}

