import React from "react";
import { IoMale, IoFemale } from "react-icons/io5";
import { PokemonAbility } from "@/types/pokemon";

interface PokemonInfoBoxProps {
  heightStr: string;
  category: string;
  weightLbs: string;
  abilities?: PokemonAbility[];
}

export const PokemonInfoBox: React.FC<PokemonInfoBoxProps> = ({
  heightStr,
  category,
  weightLbs,
  abilities = [],
}) => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="grid grid-cols-2 gap-y-4 text-sm">
        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Height
          </span>
          <span className="text-base font-bold text-slate-800 dark:text-slate-100">{heightStr}</span>
        </div>

        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Category
          </span>
          <span className="text-base font-bold text-slate-800 dark:text-slate-100">{category}</span>
        </div>

        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Weight
          </span>
          <span className="text-base font-bold text-slate-800 dark:text-slate-100">{weightLbs} lbs</span>
        </div>

        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
            Abilities
          </span>
          <div className="flex flex-wrap gap-1">
            {abilities.map((a) => (
              <span
                key={a.ability.name}
                className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium capitalize text-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {a.ability.name.replace("-", " ")}
                {a.is_hidden && (
                  <span className="text-[10px] text-purple-500 dark:text-purple-400 font-bold">(Hidden)</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
            Gender Ratio
          </span>
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-0.5 text-xs font-semibold text-blue-500">
              <IoMale className="h-4 w-4" /> 87.5%
            </span>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-pink-500">
              <IoFemale className="h-4 w-4" /> 12.5%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonInfoBox;
