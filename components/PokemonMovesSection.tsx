"use client";

import React, { useState, useMemo } from "react";
import { PokemonMoveEntry } from "@/types/pokemon";
import { FiZap, FiSearch } from "react-icons/fi";

interface PokemonMovesSectionProps {
  moves?: PokemonMoveEntry[];
}

export function PokemonMovesSection({ moves = [] }: PokemonMovesSectionProps) {
  const [filterMethod, setFilterMethod] = useState<string>("level-up");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const processedMoves = useMemo(() => {
    return moves
      .map((m) => {
        const detail = m.version_group_details[m.version_group_details.length - 1];
        const learnMethod = detail?.move_learn_method?.name || "unknown";
        const level = detail?.level_learned_at || 0;
        return {
          name: m.move.name.replace(/-/g, " "),
          rawName: m.move.name,
          learnMethod,
          level,
        };
      })
      .sort((a, b) => a.level - b.level);
  }, [moves]);

  const filteredMoves = useMemo(() => {
    return processedMoves.filter((m) => {
      const matchesMethod =
        filterMethod === "all" ||
        (filterMethod === "level-up" && m.learnMethod === "level-up") ||
        (filterMethod === "machine" && (m.learnMethod === "machine" || m.learnMethod === "technical-record")) ||
        (filterMethod === "egg" && (m.learnMethod === "egg" || m.learnMethod === "tutor"));

      const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
      return matchesMethod && matchesSearch;
    });
  }, [processedMoves, filterMethod, searchTerm]);

  return (
    <div className="rounded-2xl bg-white/80 p-6 shadow-xl backdrop-blur-md dark:bg-slate-900/80 dark:border dark:border-slate-800">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiZap className="h-5 w-5 text-amber-500" />
          <h3 className="text-lg font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
            Moves & Attacks
          </h3>
          <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold text-purple-600 dark:text-purple-400">
            {moves.length} Total
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 text-xs">
          {[
            { id: "level-up", label: "Level Up" },
            { id: "machine", label: "TM / Machine" },
            { id: "egg", label: "Egg / Tutor" },
            { id: "all", label: "All" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterMethod(tab.id)}
              className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                filterMethod === tab.id
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Filter moves..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 pl-9 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-purple-500 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200"
        />
        <FiSearch className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
      </div>

      {filteredMoves.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 max-h-80 overflow-y-auto pr-1">
          {filteredMoves.map((m, idx) => (
            <div
              key={`${m.rawName}-${idx}`}
              className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-slate-50/60 p-2.5 transition-colors hover:border-purple-300 dark:border-slate-800/80 dark:bg-slate-950/40 dark:hover:border-purple-500/40"
            >
              <span className="text-xs font-semibold capitalize text-slate-700 dark:text-slate-200">
                {m.name}
              </span>

              {m.learnMethod === "level-up" ? (
                <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                  Lvl {m.level}
                </span>
              ) : m.learnMethod === "machine" || m.learnMethod === "technical-record" ? (
                <span className="rounded-md bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold text-sky-600 dark:text-sky-400">
                  TM
                </span>
              ) : (
                <span className="rounded-md bg-purple-500/10 px-2 py-0.5 text-[10px] font-bold text-purple-600 dark:text-purple-400">
                  Special
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-xs text-slate-400">
          No moves found matching current filter
        </div>
      )}
    </div>
  );
}

export default PokemonMovesSection;
