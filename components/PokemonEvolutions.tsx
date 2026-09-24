import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { PokemonDetails } from "@/types/pokemon";

interface PokemonEvolutionsProps {
  prevPokemon: PokemonDetails | null;
  currentPokemon: PokemonDetails;
  nextPokemon: PokemonDetails | null;
  formattedId?: string;
  image?: string;
}

interface EvolutionItemProps {
  pokemon: PokemonDetails;
  isCurrent?: boolean;
  customImage?: string;
}

const EvolutionItem: React.FC<EvolutionItemProps> = ({
  pokemon,
  isCurrent = false,
  customImage,
}) => {
  const image =
    customImage ||
    pokemon.sprites?.other?.["official-artwork"]?.front_default;
  const formattedId = `#${String(pokemon.id).padStart(4, "0")}`;

  const cardContent = (
    <div className="flex flex-col items-center">
      <div
        className={`flex h-28 w-28 items-center justify-center rounded-full border-4 bg-slate-900 p-2 ${
          isCurrent
            ? "border-purple-500 shadow-lg"
            : "border-slate-600 shadow-inner transition-transform group-hover:scale-105 group-hover:border-purple-500"
        }`}
      >
        <img src={image} alt={pokemon.name} className="h-20 w-20 object-contain" />
      </div>
      <span className="mt-2 text-sm font-bold capitalize">
        {pokemon.name} <span className="text-xs text-slate-400">{formattedId}</span>
      </span>
    </div>
  );

  if (isCurrent) {
    return cardContent;
  }

  return (
    <Link href={`/pokemon/${pokemon.id}`} className="group">
      {cardContent}
    </Link>
  );
};

export const PokemonEvolutions: React.FC<PokemonEvolutionsProps> = ({
  prevPokemon,
  currentPokemon,
  nextPokemon,
  image,
}) => {
  return (
    <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <h3 className="mb-6 text-lg font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
        Navigation & Chain
      </h3>

      <div className="flex flex-col items-center justify-around gap-6 sm:flex-row">
        {prevPokemon && (
          <>
            <EvolutionItem pokemon={prevPokemon} />
            <FiArrowRight className="hidden h-6 w-6 text-slate-400 sm:block" />
          </>
        )}

        <EvolutionItem pokemon={currentPokemon} isCurrent customImage={image} />

        {nextPokemon && (
          <>
            <FiArrowRight className="hidden h-6 w-6 text-slate-400 sm:block" />
            <EvolutionItem pokemon={nextPokemon} />
          </>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <Link
          href="/"
          className="flex items-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-bold text-white shadow-md sm:shadow-lg shadow-purple-500/20 transition-all hover:scale-105 active:scale-95"
        >
          Explore More Pokemon
        </Link>
      </div>
    </div>
  );
};

export default PokemonEvolutions;
