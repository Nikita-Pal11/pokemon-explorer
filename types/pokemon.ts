export interface PokemonBasic {
  name: string;
  url: string;
}

export type pokemon = PokemonBasic;

export interface PokemonType {
  slot?: number;
  type: {
    name: string;
    url?: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort?: number;
  stat: {
    name: string;
    url?: string;
  };
}

export interface PokemonAbility {
  is_hidden?: boolean;
  slot?: number;
  ability: {
    name: string;
    url?: string;
  };
}

export interface PokemonSprites {
  front_default?: string;
  other?: {
    "official-artwork"?: {
      front_default?: string;
    };
  };
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites?: PokemonSprites;
  types?: PokemonType[];
  stats?: PokemonStat[];
  abilities?: PokemonAbility[];
}

// Backward compatibility alias
export type pokemonDetails = PokemonDetails;

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url?: string;
  };
}

export interface GenusEntry {
  genus: string;
  language: {
    name: string;
    url?: string;
  };
}

export interface PokemonSpecies {
  flavor_text_entries?: FlavorTextEntry[];
  genera?: GenusEntry[];
}

export interface StatLabel {
  key: string;
  label: string;
}
