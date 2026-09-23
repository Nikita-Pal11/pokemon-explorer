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
    <div className="rounded-2xl bg-sky-500 p-5 text-white shadow-lg">
      <div className="grid grid-cols-2 gap-y-4 text-sm">
        <div>
          <span className="block text-xs font-semibold text-sky-100 uppercase tracking-wider">
            Height
          </span>
          <span className="text-black text-base">{heightStr}</span>
        </div>

        <div>
          <span className="block text-xs font-semibold text-sky-100 uppercase tracking-wider">
            Category
          </span>
          <span className=" text-base text-black">{category}</span>
        </div>

        <div>
          <span className="block text-xs font-semibold text-sky-100 uppercase tracking-wider">
            Weight
          </span>
          <span className=" text-base text-black">{weightLbs} lbs</span>
        </div>

        <div>
          <span className="block text-xs font-semibold text-sky-100 uppercase tracking-wider">
            Abilities
          </span>
          <div className="flex flex-col capitalize text-black">
            {abilities.map((a) => (
              <span key={a.ability.name}>{a.ability.name.replace("-", " ")}</span>
            ))}
          </div>
        </div>

        <div>
          <span className="block text-xs font-semibold text-sky-100 uppercase tracking-wider mb-1">
            Gender
          </span>
          <div className="flex gap-2 text-black">
            <IoMale className="h-5 w-5" />
            <IoFemale className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonInfoBox;
