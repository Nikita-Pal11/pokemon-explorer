import React from "react";
import { PokemonType } from "@/types/pokemon";
import { typeBadgeColors } from "@/lib/typestyle";

interface PokemonTypesSectionProps {
  types?: PokemonType[];
  weaknesses?: string[];
}

export const PokemonTypesSection: React.FC<PokemonTypesSectionProps> = ({
  types = [],
  weaknesses = ["fire", "flying", "rock", "psychic"],
}) => {
  return (
    <>
      {/* Type */}
      <div>
        <h3 className="mb-2 text-sm font-bold text-slate-700 dark:text-slate-300">Type</h3>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => {
            const typeName = t.type.name.toLowerCase();
            const bgClass = typeBadgeColors[typeName] || "bg-slate-600 text-white";
            return (
              <span
                key={typeName}
                className={`rounded-lg px-4 py-1 text-xs font-bold capitalize shadow-sm ${bgClass}`}
              >
                {t.type.name}
              </span>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-bold text-slate-700 dark:text-slate-300">Weaknesses</h3>
        <div className="flex flex-wrap gap-2">
          {weaknesses.map((w) => {
            const bgClass = typeBadgeColors[w] || "bg-slate-600 text-white";
            return (
              <span
                key={w}
                className={`rounded-lg px-4 py-1 text-xs font-bold capitalize shadow-sm ${bgClass}`}
              >
                {w}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PokemonTypesSection;
