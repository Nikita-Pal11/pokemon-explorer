import { getPokemonList, getPokemonDetails } from "@/lib/api";
import { pokemon } from "@/types/pokemon";
import PokemonGrid from "@/components/PokemonGrid";
export default async function Home() {
  const pokemonList = await getPokemonList();
  const pokemonDetails = await Promise.all(
    pokemonList.map((pokemon: pokemon) => getPokemonDetails(pokemon.url)),
  );
  console.log(pokemonDetails);
  return (
    <>
    <img src="/bg.webp" className="-z-10 absolute opacity-30 w-full h-screen"/>
      <PokemonGrid pokemonDetails={pokemonDetails} />
    </>
  );
}
