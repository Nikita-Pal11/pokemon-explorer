import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPokemonById, getPokemonSpecies } from "@/lib/api";
import { FiChevronLeft } from "react-icons/fi";
import { PokemonDetails, PokemonSpecies } from "@/types/pokemon";
import PokemonStats from "@/components/PokemonStats";
import PokemonInfoBox from "@/components/PokemonInfoBox";
import PokemonTypesSection from "@/components/PokemonTypesSection";
import PokemonEvolutions from "@/components/PokemonEvolutions";
import PokemonMovesSection from "@/components/PokemonMovesSection";
import { typeStyles } from "@/lib/typestyle";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const pokemon: PokemonDetails | null = await getPokemonById(id);
  if (!pokemon) {
    return {
      title: "Pokémon Not Found - Pokemon Center",
    };
  }
  const formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const formattedId = `#${String(pokemon.id).padStart(4, "0")}`;
  return {
    title: `${formattedName} ${formattedId} | Pokemon Center`,
    description: `Explore ${formattedName}'s base stats, type strengths, abilities, and move sets.`,
  };
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
  const heightStr = `${feet}' ${inches}" (${heightMeters.toFixed(1)}m)`;

  const weightLbs = (pokemon.weight * 0.220462).toFixed(1);
  const image =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default ||
    "/placeholder.png";

  const formattedId = `#${String(pokemon.id).padStart(4, "0")}`;

  const primaryType = pokemon.types?.[0]?.type?.name?.toLowerCase() || "normal";
  const style = typeStyles[primaryType] || { glow: "from-purple-500/10 to-transparent" };

  const prevId = pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextId = pokemon.id < 1025 ? pokemon.id + 1 : null;

  const prevPokemon: PokemonDetails | null = prevId
    ? await getPokemonById(String(prevId))
    : null;
  const nextPokemon: PokemonDetails | null = nextId
    ? await getPokemonById(String(nextId))
    : null;

  return (
    <main className="relative min-h-[calc(100vh-4rem)] py-8 px-4 text-slate-100 overflow-hidden">
      <div
        className={`pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-96 w-[600px] rounded-full bg-gradient-to-b ${style.glow} blur-3xl opacity-30`}
      />

      <div className="relative mx-auto max-w-5xl z-10">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 transition-colors hover:text-purple-400"
        >
          <FiChevronLeft className="h-4 w-4" /> Back to Pokemon Center
        </Link>

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold capitalize tracking-tight sm:text-5xl">
            {pokemon.name}{" "}
            <span className="font-mono font-semibold text-slate-500 text-2xl sm:text-3xl">
              {formattedId}
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Column: Image & Stats */}
          <div className="flex flex-col gap-6">
            <div className="relative flex h-80 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-md">
              <img
                src={image}
                alt={pokemon.name}
                className="h-64 w-64 object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
              />
            </div>

            <PokemonStats stats={pokemon.stats} />
          </div>


          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl backdrop-blur-md">
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                Pokedex Entry
              </h3>
              <p className="text-sm font-medium leading-relaxed text-slate-200">
                {description}
              </p>
            </div>

            <PokemonInfoBox
              heightStr={heightStr}
              category={category}
              weightLbs={weightLbs}
              abilities={pokemon.abilities}
            />

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl backdrop-blur-md flex flex-col gap-4">
              <PokemonTypesSection types={pokemon.types} />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <PokemonMovesSection moves={pokemon.moves} />
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
