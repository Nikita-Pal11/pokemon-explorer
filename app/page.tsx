import { getPokemonList, getPokemonDetails } from "@/lib/api";
import { pokemon, pokemonDetails as PokemonDetailsType } from "@/types/pokemon";
import PokemonGrid from "@/components/PokemonGrid";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";

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
      const matchesId = pokemonId.includes(searchQuery);
      return matchesName || matchesId;
    });

    totalPages = Math.max(1, Math.ceil(filteredResults.length / limit));
    const offset = (page - 1) * limit;
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
    <main className="relative flex h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden">
      <img
        src="/bg.webp"
        className="-z-10 absolute inset-0 h-full w-full opacity-30 object-cover"
        alt=""
      />
      <SearchBar />
      {pokemonDetails.length > 0 ? (
        <Pagination currentPage={page} totalPages={totalPages}>
          <PokemonGrid pokemonDetails={pokemonDetails} />
        </Pagination>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-12 px-4 z-10">
          <p className="text-xl font-bold text-slate-200">
            No Pokémon found matching &quot;{searchQuery}&quot;
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Try searching by another name or ID number
          </p>
        </div>
      )}
    </main>
  );
}
