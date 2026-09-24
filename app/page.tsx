import { getPokemonList, getPokemonDetails } from "@/lib/api";
import { pokemon, pokemonDetails as PokemonDetailsType } from "@/types/pokemon";
import PokemonGrid from "@/components/PokemonGrid";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { FiSearch } from "react-icons/fi";
import { MdCatchingPokemon } from "react-icons/md";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params?.page || "1", 10));
  const searchQuery = params?.search?.toLowerCase().trim() || "";
  const limit = 10;

  let pokemonDetails: PokemonDetailsType[] = [];
  let totalPages = 1;

  if (searchQuery) {
    const listData = await getPokemonList(200, 0);
    const filteredResults = listData.results.filter((p: pokemon) => {
      const pokemonId = p.url.split("/").filter(Boolean).pop() || "";
      const matchesName = p.name.toLowerCase().includes(searchQuery);
      const matchesId = pokemonId === searchQuery || pokemonId.padStart(4, "0").includes(searchQuery);
      return matchesName || matchesId;
    });

    totalPages = Math.max(1, Math.ceil(filteredResults.length / limit));
    const safePage = Math.min(page, totalPages);
    const offset = (safePage - 1) * limit;
    const paginatedSlice = filteredResults.slice(offset, offset + limit);

    pokemonDetails = await Promise.all(
      paginatedSlice.map((p: pokemon) => getPokemonDetails(p.url))
    );
  } else {
    const offset = (page - 1) * limit;
    const data = await getPokemonList(limit, offset);
    pokemonDetails = await Promise.all(
      data.results.map((p: pokemon) => getPokemonDetails(p.url))
    );
    totalPages = Math.ceil(data.count / limit);
  }

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] flex-col py-6 sm:py-8">
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center mb-6">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-100 text-center mb-2">
          Gotta Catch &apos;Em All!
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 text-center max-w-md mb-4">
          Search over 100 Pokémon by name or ID, view base stats, types, moves, and evolutions.
        </p>
        <SearchBar />
      </div>

      {pokemonDetails.length > 0 ? (
        <Pagination currentPage={page} totalPages={totalPages} searchQuery={searchQuery}>
          <PokemonGrid pokemonDetails={pokemonDetails} />
        </Pagination>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 px-4 z-10 my-auto">
          <div className="h-16 w-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 shadow-xl backdrop-blur-md">
            <FiSearch className="h-8 w-8 text-purple-400" />
          </div>
          <p className="text-xl font-bold text-slate-200">
            No Pokémon found matching &quot;{searchQuery}&quot;
          </p>
          <p className="text-sm text-slate-400 mt-1 max-w-xs">
            Try searching by another name (e.g. &quot;Pikachu&quot;) or ID number (e.g. &quot;25&quot;).
          </p>
        </div>
      )}
    </main>
  );
}
