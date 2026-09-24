const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit: number = 10, offset: number = 0) {
  const resp = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`, {
    next: { revalidate: 86400 },
  });
  if (!resp.ok) {
    throw new Error("Failed to fetch Pokemon list");
  }
  return resp.json();
}

export async function getPokemonDetails(url: string) {
  const resp = await fetch(url, {
    next: { revalidate: 86400 },
  });
  if (!resp.ok) {
    throw new Error("Failed to fetch Pokemon details");
  }
  return resp.json();
}

export async function getPokemonById(id: string) {
  const resp = await fetch(`${BASE_URL}/pokemon/${id.toLowerCase()}`, {
    next: { revalidate: 86400 },
  });
  if (!resp.ok) return null;
  return resp.json();
}

export async function getPokemonSpecies(id: string) {
  const resp = await fetch(`${BASE_URL}/pokemon-species/${id.toLowerCase()}`, {
    next: { revalidate: 86400 },
  });
  if (!resp.ok) return null;
  return resp.json();
}

