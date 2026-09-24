import React from "react";

export default function DetailLoading() {
  return (
    <main className="min-h-screen py-8 px-4 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <div className="h-4 w-32 animate-pulse rounded bg-slate-800 mb-6" />
        <div className="h-10 w-64 mx-auto animate-pulse rounded-xl bg-slate-800 mb-8" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="h-80 w-full animate-pulse rounded-2xl bg-slate-900/80 border border-slate-800" />
            <div className="h-64 w-full animate-pulse rounded-2xl bg-slate-900/80 border border-slate-800" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="h-32 w-full animate-pulse rounded-2xl bg-slate-900/80 border border-slate-800" />
            <div className="h-48 w-full animate-pulse rounded-2xl bg-slate-900/80 border border-slate-800" />
            <div className="h-28 w-full animate-pulse rounded-2xl bg-slate-900/80 border border-slate-800" />
          </div>
        </div>
      </div>
    </main>
  );
}

