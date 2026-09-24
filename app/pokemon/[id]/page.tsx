import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPokemonById, getPokemonSpecies } from "@/lib/api";
import { FiChevronLeft } from "react-icons/fi";
import { PokemonDetails, PokemonSpecies } from "@/types/pokemon";
import PokemonStats from "@/components/PokemonStats";
import PokemonInfoBox from "@/components/PokemonInfoBox";
import PokemonTypesSection from "@/components/PokemonTypesSection";
import PokemonEvolutions from "@/components/PokemonEvolutions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PokemonDetailPage({ params }: PageProps) {
  const { id } = await params;
  const pokemon: PokemonDetails | null = await getPokemonById(id);

  if (!pokemon) {
    notFound();
  }

  const species: PokemonSpecies | null = await getPokemonSpecies(id);

  const descriptionEntry = species?.flavor_text_entries?.find(
    (entry) => entry.language.name === "en"
  );
  const description = descriptionEntry
    ? descriptionEntry.flavor_text.replace(/\f/g, " ")
    : "No description available.";

  const categoryEntry = species?.genera?.find(
    (g) => g.language.name === "en"
  );
  const category = categoryEntry ? categoryEntry.genus.replace(" Pokémon", "") : "Unknown";

  const heightMeters = pokemon.height / 10;
  const totalInches = Math.round(heightMeters * 39.37);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  const heightStr = `${feet}' ${inches}"`;

  const weightLbs = (pokemon.weight * 0.220462).toFixed(1);
  const image =
    pokemon.sprites?.other?.["official-artwork"]?.front_default

  const formattedId = `#${String(pokemon.id).padStart(4, "0")}`;

  const prevId = pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextId = pokemon.id < 1025 ? pokemon.id + 1 : null;

  const prevPokemon: PokemonDetails | null = prevId
    ? await getPokemonById(String(prevId))
    : null;
  const nextPokemon: PokemonDetails | null = nextId
    ? await getPokemonById(String(nextId))
    : null;

  return (
    <main className="min-h-screen bg-slate-100 py-8 px-4 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
        >
          <FiChevronLeft className="h-4 w-4" /> Back to Pokedex
        </Link>

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold capitalize tracking-tight sm:text-4xl">
            {pokemon.name}{" "}
            <span className="font-mono font-medium text-slate-400">
              {formattedId}
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex h-80 items-center justify-center rounded-2xl bg-slate-200/80 p-6 shadow-inner dark:bg-slate-900/80">
              <img
                src={image}
                alt={pokemon.name}
                className="h-64 w-64 object-contain drop-shadow-xl transition-transform hover:scale-105"
              />
            </div>

            <PokemonStats stats={pokemon.stats} />
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300">
              {description}
            </p>

            <PokemonInfoBox
              heightStr={heightStr}
              category={category}
              weightLbs={weightLbs}
              abilities={pokemon.abilities}
            />

            <PokemonTypesSection types={pokemon.types} />
          </div>
        </div>

        <PokemonEvolutions
          prevPokemon={prevPokemon}
          currentPokemon={pokemon}
          nextPokemon={nextPokemon}
          formattedId={formattedId}
          image={image}
        />
      </div>
    </main>
  );
}
