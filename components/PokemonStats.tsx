import React from "react";
import { PokemonStat, StatLabel } from "@/types/pokemon";

interface PokemonStatsProps {
  stats?: PokemonStat[];
}

const STAT_LABELS: StatLabel[] = [
  { key: "hp", label: "HP" },
  { key: "attack", label: "Attack" },
  { key: "defense", label: "Defense" },
  { key: "special-attack", label: "Special Attack" },
  { key: "special-defense", label: "Special Defense" },
  { key: "speed", label: "Speed" },
];

export const PokemonStats: React.FC<PokemonStatsProps> = ({ stats = [] }) => {
  const statMap: Record<string, number> = {
    hp: 0,
    attack: 0,
    defense: 0,
    "special-attack": 0,
    "special-defense": 0,
    speed: 0,
  };

  let totalStats = 0;
  stats.forEach((s) => {
    statMap[s.stat.name] = s.base_stat;
    totalStats += s.base_stat;
  });

  const getStatColor = (key: string) => {
    switch (key) {
      case "hp":
        return "bg-emerald-500";
      case "attack":
        return "bg-amber-500";
      case "defense":
        return "bg-sky-500";
      case "special-attack":
        return "bg-indigo-500";
      case "special-defense":
        return "bg-purple-500";
      case "speed":
        return "bg-rose-500";
      default:
        return "bg-sky-500";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Base Stats
        </h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          Total: {totalStats}
        </span>
      </div>

      <div className="grid grid-cols-6 gap-2 items-end h-48 pt-2">
        {STAT_LABELS.map((stat) => {
          const val = statMap[stat.key] || 0;
          const heightPercent = Math.min(100, Math.round((val / 180) * 100));
          const barColor = getStatColor(stat.key);

          return (
            <div key={stat.key} className="flex flex-col items-center h-full justify-end">
              <span className="mb-1.5 text-xs font-bold text-slate-700 dark:text-slate-200">
                {val}
              </span>
              <div className="w-full flex-1 bg-slate-200/80 dark:bg-slate-800/80 rounded-lg overflow-hidden flex flex-col justify-end p-0.5 shadow-inner">
                <div
                  className={`w-full ${barColor} rounded-md transition-all duration-700 ease-out`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              <span className="mt-2 text-[10px] font-bold text-center leading-tight text-slate-600 dark:text-slate-400">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonStats;
