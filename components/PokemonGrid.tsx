import React from 'react'
import {pokemonDetails} from "@/types/pokemon";
import PokemonCard from "@/components/PokemonCard";
function PokemonGrid({pokemonDetails}:{pokemonDetails:pokemonDetails[]}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-7xl mx-auto">
      {pokemonDetails.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}

export default PokemonGrid
