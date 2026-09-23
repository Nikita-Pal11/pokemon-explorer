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
    <div className="mt-8 rounded-2xl bg-slate-800/90 p-6 text-white shadow-xl">
      <h3 className="mb-6 text-lg font-extrabold tracking-tight">Evolutions</h3>

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
          className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-extrabold text-white shadow-md transition-all hover:bg-orange-600 hover:shadow-orange-500/20"
        >
          Explore More Pokémon
        </Link>
      </div>
    </div>
  );
};

export default PokemonEvolutions;
