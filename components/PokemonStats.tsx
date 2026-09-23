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

  stats.forEach((s) => {
    statMap[s.stat.name] = s.base_stat;
  });

  return (
    <div className="rounded-2xl bg-slate-400/30 p-5 backdrop-blur-sm dark:bg-slate-800/80">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
        Stats
      </h3>
      <div className="grid grid-cols-6 gap-2 items-end h-40 pt-2">
        {STAT_LABELS.map((stat) => {
          const val = statMap[stat.key] || 0;
          const heightPercent = Math.min(100, Math.round((val / 180) * 100));
          return (
            <div key={stat.key} className="flex flex-col items-center h-full justify-end">
              <div className="w-full flex-1 bg-slate-300 dark:bg-slate-700 rounded-md overflow-hidden flex flex-col justify-end p-0.5">
                <div
                  className="w-full bg-sky-500 rounded-sm transition-all duration-500"
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              <span className="mt-2 text-[10px] font-bold text-center leading-tight text-slate-700 dark:text-slate-300">
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
