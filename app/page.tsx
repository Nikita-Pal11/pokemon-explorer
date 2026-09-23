import { getPokemonList, getPokemonDetails } from "@/lib/api";
import { pokemon } from "@/types/pokemon";
import PokemonGrid from "@/components/PokemonGrid";
import PaginationLayout from "@/components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params?.page || "1", 10));
  const limit = 10;
  const offset = (page - 1) * limit;

  const data = await getPokemonList(limit, offset);
  const pokemonDetails = await Promise.all(
    data.results.map((p: pokemon) => getPokemonDetails(p.url))
  );

  const totalPages = Math.ceil(data.count / limit);

  return (
    <main className="relative flex h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden">
      <img
        src="/bg.webp"
        className="-z-10 absolute inset-0 h-full w-full object-cover opacity-30"
        alt=""
      />
      <PaginationLayout currentPage={page} totalPages={totalPages}>
        <PokemonGrid pokemonDetails={pokemonDetails} />
      </PaginationLayout>
    </main>
  );
}
