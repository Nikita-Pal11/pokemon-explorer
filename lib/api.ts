const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit: number = 10, offset: number = 0) {
  const resp = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data.message || "Failed to fetch Pokemon list");
  }
  return data;
}

export async function getPokemonDetails(url: string) {
  const resp = await fetch(url);
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data.message || "Failed to fetch Pokemon details");
  }
  return data;
}
